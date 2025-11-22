const Storage = {
  KEY: 'maqueta_data_v1',
  RULES_KEY: 'maqueta_rules_v1',
  getAll() {
    return JSON.parse(localStorage.getItem(this.KEY) || '[]');
  },
  addEntry(item) {
    const arr = this.getAll();
    arr.push(item);
    localStorage.setItem(this.KEY, JSON.stringify(arr));
  },
  clearAll() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.RULES_KEY);
  },
  // Rules
  getRules() {
    return JSON.parse(localStorage.getItem(this.RULES_KEY) || '[]');
  },
  addRule(rule) {
    const r = this.getRules();
    r.push(rule);
    localStorage.setItem(this.RULES_KEY, JSON.stringify(r));
  },
  deleteRule(idx) {
    const r = this.getRules();
    r.splice(idx,1);
    localStorage.setItem(this.RULES_KEY, JSON.stringify(r));
  }
};
