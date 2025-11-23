const Model = {
  normalize(v){ return Number(v)||0; },

  simulate(data){
    const byArea = data.reduce((acc,r)=>{
      acc[r.area] = (acc[r.area]||0) + this.normalize(r.value);
      return acc;
    }, {});

    const labels = Array.from({length:12},(_,i)=>`T${i+1}`);

    const base = labels.map((_,i)=>{
      const rr = byArea.rrhh||0;
      const op = byArea.ops||0;
      const fi = byArea.fin||0;
      return (rr*0.3 + op*0.4 + fi*0.3) * (1 + i*0.01);
    });

    return {
      labels,
      optimistic: base.map(v=>v*1.12),
      expected: base.map(v=>v),
      pessimistic: base.map(v=>v*0.85)
    };
  }
};

// CLASIFICACIÓN SEMÁFORO
class ModelColor{
  static classify(expected, threshold){
    if(threshold === null)
      return {color:"gris", msg:"Sin umbral definido."};

    if(expected > threshold)
      return {color:"rojo", msg:`Rojo: ${expected.toFixed(2)} supera el umbral (${threshold}).`};

    if(expected === threshold)
      return {color:"amarillo", msg:`Amarillo: ${expected.toFixed(2)} es igual al umbral (${threshold}).`};

    if(expected < threshold)
      return {color:"verde", msg:`Verde: ${expected.toFixed(2)} está por debajo del umbral (${threshold}).`};
  }
}
