const Model = {
  normalize(val){ return Number(val) || 0; },

  // Simple simulate: aggregate by area and produce 12-time points
  simulate(data, opts={}) {
    const byArea = data.reduce((acc,r)=>{
      acc[r.area] = (acc[r.area]||0) + this.normalize(r.value);
      return acc;
    }, {});
    const labels = Array.from({length:12}, (_,i)=>`T${i+1}`);
    const base = labels.map((_,i)=> {
      const rr = byArea.rrhh||0;
      const op = byArea.ops||0;
      const fi = byArea.fin||0;
      // a small growth factor to visualize trend
      return (rr*0.3 + op*0.4 + fi*0.3) * (1 + i*0.01);
    });
    const optimistic = base.map(v=> v * 1.12);
    const expected   = base.map(v=> v * 1.00);
    const pessimistic= base.map(v=> v * 0.85);
    return { labels, optimistic, expected, pessimistic };
  },

  // Evaluate simple rules against expected series
  evaluateRules(sim, rules){
    const alerts = [];
    // simple engine: rules are expressions using keywords: optimistic, expected, pessimistic
    rules.forEach(r=>{
      try{
        // create context
        const ctx = {
          optimistic: sim.optimistic.slice(-1)[0],
          expected: sim.expected.slice(-1)[0],
          pessimistic: sim.pessimistic.slice(-1)[0]
        };
        // unsafe eval caution: this is demo only
        const expr = r.expr
          .replace(/optimistic/g, 'ctx.optimistic')
          .replace(/expected/g, 'ctx.expected')
          .replace(/pessimistic/g, 'ctx.pessimistic');
        const res = eval(expr);
        if(res) alerts.push(`Regla "${r.name}" activada`);
      }catch(e){
        console.warn('rule eval error', e);
      }
    });
    return alerts;
  }
};
