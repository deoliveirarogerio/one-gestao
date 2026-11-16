document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu');

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    });

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
      });
    }

    // Close mobile menu on clicking nav link
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // Header Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('py-3', 'shadow-2xl', 'border-emerald-500/30');
      navbar.classList.remove('py-5');
    } else {
      navbar.classList.add('py-5');
      navbar.classList.remove('py-3', 'shadow-2xl', 'border-emerald-500/30');
    }
  });

  // Service Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-600', 'text-white', 'shadow-lg');
        b.classList.add('bg-emerald-950/40', 'text-emerald-300', 'hover:bg-emerald-900/50');
      });
      // Add active to clicked
      btn.classList.add('bg-emerald-600', 'text-white', 'shadow-lg');
      btn.classList.remove('bg-emerald-950/40', 'text-emerald-300', 'hover:bg-emerald-900/50');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Modal Detailed Services
  const modal = document.getElementById('service-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDescription = document.getElementById('modal-description');
  const modalDetailsList = document.getElementById('modal-details-list');
  const modalCloseBtn = document.getElementById('modal-close');

  const serviceData = {
    pgr: {
      title: 'PGR - Programa de Gerenciamento de Riscos (NR-01)',
      subtitle: 'Documento obrigatório para todas as empresas contratantes de CLT',
      description: 'O PGR é a espinha dorsal da segurança do trabalho na legislação moderna. Substituiu o antigo PPRA e exige identificação contínua de perigos, avaliação de riscos e plano de ação estruturado.',
      items: [
        'Elaboração de Inventário de Riscos Físicos, Químicos, Biológicos e Ergonômicos',
        'Plano de Ação com cronograma de implementação e responsáveis',
        'Integração direta aos eventos S-2240 do eSocial SST',
        'Emissão assinada por Engenheiro de Segurança do Trabalho credenciado no CREA'
      ]
    },
    pcmso: {
      title: 'PCMSO - Prog. de Controle Médico de Saúde Ocupacional (NR-07)',
      subtitle: 'Monitoramento da saúde física e mental dos colaboradores',
      description: 'Estrutura o rastreamento e diagnóstico precocemente dos agravos à saúde relacionados ao trabalho, definindo a periodicidade dos exames (Admissional, Periódico, Demissional, Retorno e Mudança de Risco).',
      items: [
        'Planejamento de Exames Complementares por função e grau de risco',
        'Relatório Analítico Anual com indicadores epidemiológicos da empresa',
        'Emissão de ASO (Atestado de Saúde Ocupacional) com padrão eSocial S-2220',
        'Coordenação feita por Médico do Trabalho especialista RQE'
      ]
    },
    ltcat: {
      title: 'LTCAT - Laudo Técnico das Condições Ambientais de Trabalho',
      subtitle: 'Base legal para Aposentadoria Especial e GFIP/eSocial',
      description: 'Documento conclusivo exigido pelo INSS para comprovar a exposição ou neutralização de agentes nocivos que garantem o direito à Aposentadoria Especial ou tributação adicional de RAT/FAP.',
      items: [
        'Aferição com dosímetros de ruído e bombas de amostragem calibradas RBC/INMETRO',
        'Avaliação de agentes químicos, calor, vibração (VMB/VBC) e radiação',
        'Adequação das informações para emissão de PPP (Perfil Profissiográfico Previdenciário) eletrônico',
        'Comprovação de eficácia de EPIs/EPCs aplicados na empresa'
      ]
    },
    esocial: {
      title: 'Gestão Completa do eSocial SST (S-2210, S-2220, S-2240)',
      subtitle: 'Transmissão direta de eventos e eliminação de multas trabalhistas',
      description: 'Asseguramos o cumprimento rigoroso dos prazos legais do eSocial para evitar autos de infração e bloqueio de certidões negativas da empresa.',
      items: [
        'S-2210: Comunicação de Acidente de Trabalho (CAT) em até 24 horas',
        'S-2220: Monitoramento da Saúde do Trabalhador (ASOs e exames complementares)',
        'S-2240: Condições Ambientais do Trabalho (Agentes nocivos e adicionais de insalubridade/periculosidade)',
        'Validação de inconsistências do leiaute antes do envio ao ambiente governamental'
      ]
    },
    treinamentos: {
      title: 'Treinamentos Obrigatórios e Capacitações (NRs 05, 10, 33, 35)',
      subtitle: 'Formação técnica com certificado válido e emissão com ART',
      description: 'Capacitações teóricas e práticas presenciais e in-company ministradas por instrutores habilitados com larga experiência operacional.',
      items: [
        'NR-05: CIPA (Comissão Interna de Prevenção de Acidentes e Assédio)',
        'NR-35: Trabalho em Altura (Teoria, nós, ancoragem e resgate prático)',
        'NR-33: Espaço Confinado para Trabalhadores e Vigias',
        'NR-10: Segurança em Instalações e Serviços em Eletricidade',
        'Brigada de Incêndio e Primeiros Socorros'
      ]
    },
    ergonomia: {
      title: 'AEP e AET - Análise Ergonômica do Trabalho (NR-17)',
      subtitle: 'Conforto, produtividade e prevenção de LER/DORT',
      description: 'Avaliação detalhada dos postos de trabalho para adequação biomecânica, organizacional e psicossocial das atividades dos funcionários.',
      items: [
        'Análise Preliminar de Perigos Ergonômicos (AEP)',
        'Análise Ergonômica do Trabalho (AET) com ferramentas RULA, NIOSH e OCRA',
        'Redesenho biomecânico de bancadas, ferramentas e rotinas administrativas',
        'Prevenção de afastamentos trabalhistas por transtornos osteomusculares'
      ]
    }
  };

  document.querySelectorAll('.open-service-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      const data = serviceData[serviceKey];

      if (data && modal) {
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalDescription.textContent = data.description;

        modalDetailsList.innerHTML = '';
        data.items.forEach(item => {
          const li = document.createElement('li');
          li.className = 'flex items-start gap-3 text-slate-300 text-sm md:text-base';
          li.innerHTML = `
            <span class="p-1 bg-emerald-500/20 text-emerald-400 rounded-full mt-1 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
            <span>${item}</span>
          `;
          modalDetailsList.appendChild(li);
        });

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  // Quick WhatsApp Form
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name').value.trim();
      const phone = document.getElementById('lead-phone').value.trim();
      const company = document.getElementById('lead-company').value.trim();
      const employees = document.getElementById('lead-employees').value;
      const service = document.getElementById('lead-service').value;

      const message = `Olá, vim pelo site da *One Gestão em SST*!\n\n` +
        `*Nome:* ${name}\n` +
        `*Empresa:* ${company}\n` +
        `*Telefone:* ${phone}\n` +
        `*Qtd Colaboradores:* ${employees}\n` +
        `*Serviço de Interesse:* ${service}\n\n` +
        `Gostaria de solicitar um orçamento/atendimento comercial.`;

      const encodedMessage = encodeURIComponent(message);
      // Default placeholder phone number for One Gestão em SST - can be updated easily by client
      const whatsappNumber = '5511999999999';
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
  }
});
