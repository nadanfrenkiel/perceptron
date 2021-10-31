const KEY_PREFIX = "data-server";

import $ from "./jquery.module.js";

export class DataServer {
	constructor(name, selector) {
		this.name = name;
		this.selector = selector;
		this.KEY_REGEX = new RegExp(`${KEY_PREFIX}-(${this.displayToKey(name)})-(.+)$`, "i");
	}

	keyToDisplay(name) {
		return name.replace(/[^a-z0-9]+/ig, " ");
	}

	displayToKey(name) {
		return name.replace(/\s+/g, '-');
	}

	nameToKey(name) {
		return `${KEY_PREFIX}-${this.displayToKey(this.name)}-${this.displayToKey(name)}`;
	}

	keyToName(key) {
		const match = (key || "").match(this.KEY_REGEX);
		return (match && match[1]) || null;
	}

	init() {
		this.loadUI();
		this.populate();
		return this;
	}

	populate() {
		var $s = $(this.selector).find("select.data-server-select");
		$s.empty();
		this.list().then(lst => {
			$s.append(new Option("Select data to load...", ""));
			lst.forEach(name => {
				$s.append(new Option(this.keyToDisplay(name), name));
			});
		});
	}

	list() {
		return new Promise((resolve, reject) => {
			try {
				const ret = [];
				for (let i = 0, len = localStorage.length; i < len; i++) {
					const key = localStorage.key(i),
						match = key && key.match(this.KEY_REGEX),
						name = match && match[1];
					if (name === this.name) {
						ret.push(match[2]);
					}
				}
				resolve(ret);
			}
			catch (e) {
				console.error(e);
				resolve([]);
			}
		})
	}
	loadData(name) {
		return new Promise((resolve) => {
			try {
				const data = localStorage.getItem(this.nameToKey(name));
				resolve(data && JSON.parse(data)|| null);
			}
			catch(e) {
				console.error(e);
				resolve(null);
			}
		})
	}
	remove(name) {
		if (!confirm("Delete " + name + "?")) {
			return;
		}
		const key = this.nameToKey(name);
		localStorage.removeItem(key);
		this.populate();
	}

	saveData(name, data) {
		if (data === null || data === undefined) {
			return;
		}
		if (typeof data !== "string") {
			data = JSON.stringify(data);
		}
		return new Promise(resolve => {
			try {
				const key = this.nameToKey(name);
				localStorage.setItem(key, data);
				this.populate();
				resolve(true);
			}
			catch (e) {
				console.error(e);
				resolve(false);
			}
		});
	}

	onSave() {
		const name = prompt("Save as...");
		if (name) {
			this.loadData(name).then(oldData => {
				if (!oldData || confirm("Overwrite current saved data for " + name + "?")) {
					$(this).trigger("save", [this, name]);
				}
			});
		}
	}

	async onLoad($ui) {
		const name = $ui.find(".data-server-select").val()
		if (name) {
			const data = await this.loadData(name, true);
			if (data) {
				$(this).trigger("load", [data, this]);
			}
		}
		else {
			console.log("no value");
		}

	}

	configureUI($ui) {
		$ui.find("button.data-server-load").click(() => this.onLoad($ui));
		$ui.find("button.data-server-save").click(() => this.onSave());
	}



	loadUI() {
		const $ui = $(`<div class="data-server-container">
		<div class="data-server-title">${this.name}</div>
		<div class="data-server-select-container">
			<select class="data-server-select"></select>
			<div>
				<button class="btn data-server-load">load</button>
			</div>
		</div>
		<div class="data-server-save-container">
			<button class="btn data-server-save">save</button>
		</div>
	</div>`);

		this.configureUI($ui);
		$(this.selector).empty().append($ui);
		return $ui;
	}
}
