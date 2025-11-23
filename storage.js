const Storage = {
  KEY: 'maqueta_data_v1',
  THRESHOLD_KEY: 'maqueta_threshold_v1',

  getAll(){ return JSON.parse(localStorage.getItem(this.KEY) || '[]'); },
  addEntry(item){
    const arr = this.getAll();
    arr.push(item);
    localStorage.setItem(this.KEY, JSON.stringify(arr));
  },

  // UMBRAL
  getThreshold(){
    return JSON.parse(localStorage.getItem(this.THRESHOLD_KEY) || 'null');
  },
  setThreshold(val){
    localStorage.setItem(this.THRESHOLD_KEY, JSON.stringify(val));
  },

  clearAll(){
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.THRESHOLD_KEY);
  }
};
