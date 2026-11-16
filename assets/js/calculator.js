document.addEventListener('DOMContentLoaded', () => {
  const calcForm = document.getElementById('sst-calc-form');
  const calcResults = document.getElementById('calc-results');

  if (calcForm && calcResults) {
    const qtyInput = document.getElementById('calc-qty');
    const riskInput = document.getElementById('calc-risk');
    const hasPGR = document.getElementById('calc-pgr');
    const hasPCMSO = document.getElementById('calc-pcmso');
    const hasEsocial = document.getElementById('calc-esocial');

    const resultRiskBadge = document.getElementById('result-risk-badge');
    const resultDocList = document.getElementById('result-doc-list');
    const resultActionBtn = document.getElementById('result-action-btn');

    function calculateDiagnostic() {
      const qty = parseInt(qtyInput.value) || 1;
      const risk = parseInt(riskInput.value) || 2;
      const pgrChecked = hasPGR.checked;
      const pcmsoChecked = hasPCMSO.checked;
      const esocialChecked = hasEsocial.checked;

      // Mandatory documents
      const docs = [
        { name: 'PGR (NR-01) - Prog. de Gerenciamento de Riscos', required: true, current: pgrChecked },
        { name: 'PCMSO (NR-07) - Prog. de Controle Médico de Saúde Ocupacional', required: true, current: pcmsoChecked },
        { name: 'LTCAT - Laudo de Condições Ambientais do Trabalho (INSS)', required: risk >= 2 || qty >= 5, current: pgrChecked && esocialChecked },
        { name: 'Eventos eSocial SST (S-2210, S-2220, S-2240)', required: true, current: esocialChecked },
      ];

      if (risk >= 3) {
        docs.push({ name: 'CIPA / Nomeado CIPA (NR-05)', required: true, current: false });
        docs.push({ name: 'Treinamentos de NR-35 / NR-33 / NR-10 (Se aplicável)', required: true, current: false });
      }

      if (qty >= 20) {
        docs.push({ name: 'Análise Ergonômica do Trabalho (AET - NR 17)', required: true, current: false });
      }

      // Calculate risk score
      let missingCount = 0;
      docs.forEach(d => {
        if (d.required && !d.current) missingCount++;
      });

      // Render Badge
      let badgeHTML = '';
      if (missingCount === 0) {
        badgeHTML = `
          <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs md:text-sm font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></span>
            STATUS: BAIXO RISCO DE MULTA (CONFORME)
          </span>
        `;
      } else if (missingCount <= 2) {
        badgeHTML = `
          <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs md:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2"></span>
            STATUS: RISCO MODERADO - REGULARIZAÇÃO PENDENTE
          </span>
        `;
      } else {
        badgeHTML = `
          <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs md:text-sm font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-2"></span>
            STATUS: ALTO RISCO DE AUTUAÇÃO E MULTA eSOCIAL
          </span>
        `;
      }
      resultRiskBadge.innerHTML = badgeHTML;

      // Render Docs List
      resultDocList.innerHTML = '';
      docs.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-sm';
        const isOk = doc.current;
        item.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="${isOk ? 'text-emerald-400 bg-emerald-500/20' : 'text-amber-400 bg-amber-500/20'} p-1.5 rounded-md">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${isOk 
                  ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>' 
                  : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>'}
              </svg>
            </span>
            <span class="${isOk ? 'text-slate-300 line-through opacity-70' : 'text-white font-medium'}">${doc.name}</span>
          </div>
          <span class="text-xs px-2 py-1 rounded font-semibold ${isOk ? 'bg-emerald-900/60 text-emerald-300' : 'bg-rose-900/60 text-rose-300'}">
            ${isOk ? 'OK' : 'Pendente'}
          </span>
        `;
        resultDocList.appendChild(item);
      });

      // Update CTA
      resultActionBtn.onclick = () => {
        const msg = `Olá! Realizei o diagnóstico online no site da *One Gestão em SST*.\n\n` +
          `*Número de Colaboradores:* ${qty}\n` +
          `*Grau de Risco:* Grau ${risk}\n` +
          `*Pendências identificadas:* ${missingCount} item(ns)\n\n` +
          `Gostaria de um orçamento para regularizar minha empresa.`;
        window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, '_blank');
      };
    }

    calcForm.addEventListener('input', calculateDiagnostic);
    calcForm.addEventListener('change', calculateDiagnostic);
    calculateDiagnostic();
  }
});
