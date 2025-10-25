// ===============================
// TUDO COMEÇA DEPOIS QUE O HTML CARREGA
document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // SLIDER PRINCIPAL (imagens)
    // ===============================
// ===============================
// SLIDER PRINCIPAL (imagens) (ATUALIZADO)
// ===============================

// Seleciona elementos
const items = document.querySelectorAll('.slider .list .item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

// --- SELEÇÕES MODIFICADAS ---
const thumbList = document.querySelector('.thumbnail .list'); // O "trilho" que se move
const thumbs = document.querySelectorAll('.thumbnail .list .item'); // Os itens DENTRO do trilho

// Verificação de segurança (agora checa o thumbList)
if (items.length > 0 && thumbList && thumbs.length > 0 && next && prev) {

    let current = 0; // índice do slide atual
    const slideDuration = 9800; // Tempo padrão
    let slideInterval = setInterval(autoSlide, slideDuration);
    let isPaused = false;

    // --- LÓGICA DO SLIDER DE THUMBNAILS ---
    
    // ⬇️ !! AJUSTE ESTE VALOR !! ⬇️
    // Quantos thumbnails você quer que fiquem visíveis de uma vez?
    const THUMBS_VISIBLE = 4; // Ex: 4 itens
    
    // --- VALORES DO SEU CSS (Já ajustados) ---
    const THUMB_GAP = 10;     // (Seu gap: 10px)
    const thumbWidth = 150;   // (Seu .item width: 150px)
    
    let currentThumbIndex = 0; // Posição do carrossel de thumbs
    const maxThumbIndex = thumbs.length - THUMBS_VISIBLE;

    // ==========================================================
    // FUNÇÃO 'showSlide' ATUALIZADA (Onde a mágica acontece)
    // ==========================================================
    function showSlide(index) {
        // 1. Atualiza slides principais
        items.forEach((item, i) => item.classList.toggle('active', i === index));
        // 2. Atualiza thumbs ativos
        thumbs.forEach((thumb, i) => thumb.classList.toggle('active', i === index));
        current = index;

        // --- LÓGICA ADICIONADA PARA MOVER O "TRILHO" DE THUMBS ---

        // 3. Verifica se o thumb ativo está fora da área visível
        if (index >= currentThumbIndex + THUMBS_VISIBLE) {
            currentThumbIndex = index - THUMBS_VISIBLE + 1;
        } else if (index < currentThumbIndex) {
            currentThumbIndex = index;
        }

        // 4. Garante que o trilho não passe dos limites
        if (currentThumbIndex > maxThumbIndex) {
            currentThumbIndex = maxThumbIndex;
        }
        if (currentThumbIndex < 0) {
            currentThumbIndex = 0;
        }

        // 5. Calcula a distância e move o trilho de thumbs
        const offset = -currentThumbIndex * (thumbWidth + THUMB_GAP);
        thumbList.style.transform = `translateX(${offset}px)`;
    }

    // --- O RESTO DO SEU JS (Sem alteração) ---
    
    function nextSlide() {
        showSlide((current + 1) % items.length);
    }
    function prevSlide() {
        showSlide((current - 1 + items.length) % items.length);
    }
    function autoSlide() {
        if (!isPaused) { nextSlide(); }
    }
    function pauseSlide() {
        isPaused = true;
        clearInterval(slideInterval);
    }
    function restartSlide() {
        if (isPaused) {
            isPaused = false;
            slideInterval = setInterval(autoSlide, slideDuration);
        }
    }
    
    // Eventos de clique nas setas
    next.addEventListener('click', () => {
        nextSlide();
        pauseSlide();
    });
    prev.addEventListener('click', () => {
        prevSlide();
        pauseSlide();
    });
    
    // Eventos de clique nas miniaturas
    thumbs.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            showSlide(i); 
            pauseSlide();
        });
    });
    
    // Reinicia o slide quando o usuário rolar a página
    window.addEventListener('scroll', () => {
        restartSlide();
    });

    // Inicia o slider na posição 0
    showSlide(0); 

} // Fim da verificação do Slider Principal

    // ===============================
    // SLIDER GRID SERVIÇOS
    // ===============================

    const slidesContainer = document.querySelector('.grid');
    const wrapper = document.querySelector('.slidde-grid');

    // ** Verificação para não quebrar se o slider não existir **
    if (slidesContainer && wrapper) {
        const slides = document.querySelectorAll('.grid > div');
        const nextBtn1 = wrapper.querySelector('.next-btn');
        const prevBtn1 = wrapper.querySelector('.prev-btn');
        const paginationContainer = wrapper.querySelector('.pagination');

        // ** CORRIGIDO: Iniciar no índice 0 **
        let currentIndex1 = 0;
        const totalSlides = slides.length;

        if (totalSlides > 0) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = index;
                paginationContainer.appendChild(dot);
            });

            const dots = paginationContainer.querySelectorAll('.dot');
            dots[0].classList.add('active');

            function updateDots(index) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }

            function goToSlide(index) {
                slidesContainer.style.transform = `translateX(-${index * 100}%)`;
                currentIndex1 = index;
                // ** CORRIGIDO: Usando currentIndex1 **
                updateDots(currentIndex1);
            }

            nextBtn1.addEventListener('click', () => {
                // ** CORRIGIDO: Usando currentIndex1 **
                let nextIndex = (currentIndex1 + 1) % totalSlides;
                goToSlide(nextIndex);
            });

            prevBtn1.addEventListener('click', () => {
                // ** CORRIGIDO: Usando currentIndex1 **
                let prevIndex = (currentIndex1 - 1 + totalSlides) % totalSlides;
                goToSlide(prevIndex);
            });

            dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    goToSlide(index);
                });
            });
        }

    } 
    
    
    
    
    // Fim da verificação do Grid Serviços

    // ===============================
    // ANIMAÇÃO LOTTIE
    // ===============================

    // A função que inicializa a animação
    function initLottieAnimation() {
        const container = document.getElementById("animation");
        if (!container) return; // Se não achar o container, para aqui

        // Verifica se o Lottie foi carregado antes de usar
        if (typeof lottie !== 'undefined') {
            lottie.loadAnimation({
                container: container,
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: "animations/azul.json"
            });
        } else {
            console.error('Lottie não foi carregado a tempo.');
        }
    }

    // Cria e carrega o script do Lottie
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.10.2/lottie.min.js";
    // ** CORRIGIDO: Chama a inicialização DEPOIS que o script carregar **
    script.onload = initLottieAnimation;
    document.head.appendChild(script);

    // ===============================
    // SLIDER 2 (Projetos)
    // ===============================

    const slider2 = document.querySelector('.slider2');
    const grid2 = document.querySelector('.grid2');
    
    // ** Verificação movida para ser mais segura **
    if (slider2 && grid2) {
        const cards = document.querySelectorAll('.card2');
        
        if (cards.length > 0) {
            let index2 = 0;
            const totalCards = cards.length;
            const gap = 20;
            const cardWidth = cards[0].offsetWidth;
            const initialOffset = 70;

            const prev2 = document.createElement('button');
            prev2.id = 'prev2';
            prev2.className = 'arrow';
            prev2.innerHTML = '&#10094;';

            const next2 = document.createElement('button');
            next2.id = 'next2';
            next2.className = 'arrow';
            next2.innerHTML = '&#10095;';

            slider2.style.position = 'relative';
            slider2.appendChild(prev2);
            slider2.appendChild(next2);

            function updateProjectSlide() {
                const offset = -index2 * (cardWidth + gap) + initialOffset;
                grid2.style.transform = `translateX(${offset}px)`;
            }

            updateProjectSlide();

            // RECOMENDAÇÃO: Mover estes estilos para seu arquivo CSS
            const buttonStyles = `
                position: absolute; top: 50%; transform: translateY(-50%);
                z-index: 100; background: rgba(232, 73, 29, 0.8); color: white;
                border: none; width: 50px; height: 50px; border-radius: 50%;
                cursor: pointer; font-size: 2rem; transition: background 0.3s ease;
            `;
            prev2.style.cssText = buttonStyles + `left: 10px;`;
            next2.style.cssText = buttonStyles + `right: 10px;`;

            [prev2, next2].forEach(btn => {
                btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(232, 73, 29, 1)');
                btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(232, 73, 29, 0.8)');
            });

            next2.addEventListener('click', () => {
                if (index2 < totalCards - 1) {
                    index2++;
                    updateProjectSlide();
                }
            });

            prev2.addEventListener('click', () => {
                if (index2 > 0) {
                    index2--;
                    updateProjectSlide();
                }
            });

            function autoNextSlide() {
                if (index2 < totalCards - 1) {
                    index2++;
                } else {
                    index2 = 0;
                }
                updateProjectSlide();
            }

            let projectInterval = setInterval(autoNextSlide, 7000);

            slider2.addEventListener('mouseenter', () => {
                clearInterval(projectInterval);
            });

            slider2.addEventListener('mouseleave', () => {
                projectInterval = setInterval(autoNextSlide, 7000);
            });
        }
    } // Fim da verificação do Slider 2

    // ===============================
    // LIGHTBOX (para o Slider 2)
    // ===============================

    const noLinkCards = document.querySelectorAll('.card2.no-link');
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const prevBtnLight = document.getElementById('lightbox-prev'); // Renomeado para evitar confusão
    const nextBtnLight = document.getElementById('lightbox-next'); // Renomeado para evitar confusão

    // ** Verificação para não quebrar se o lightbox não existir **
    if (lightbox && lightboxImg && lightboxClose && prevBtnLight && nextBtnLight) {

        let currentImages = [];
        let currentIndex = 0; // Esta variável agora é única para o lightbox

        noLinkCards.forEach(card => {
            card.addEventListener('click', () => {
                if (!card.dataset.img) return;
                const images = card.dataset.img.split(',');
                currentImages = images;
                currentIndex = 0;
                if (currentImages.length > 0) {
                    lightboxImg.src = currentImages[currentIndex];
                    lightbox.classList.add('active');
                }
            });
        });

        nextBtnLight.addEventListener('click', () => {
            if (currentImages.length > 0) {
                currentIndex = (currentIndex + 1) % currentImages.length;
                lightboxImg.src = currentImages[currentIndex];
            }
        });

        prevBtnLight.addEventListener('click', () => {
            if (currentImages.length > 0) {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                lightboxImg.src = currentImages[currentIndex];
            }
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    } // Fim da verificação do Lightbox

    // ========================================
// LÓGICA DA LISTA CONECTADA (MODIFICADA PARA CLICK)
// ========================================

// (Verifique se isso está dentro do seu 'DOMContentLoaded')

// 1. Armazene os dados (Lottie URL e Descrição)
// ========================================
// LÓGICA DA LISTA CONECTADA (COM CLIQUE, LAYOUT ANTIGO)
// ========================================

// (Verifique se isso está dentro do seu 'DOMContentLoaded')

// 1. Armazene os dados (Lottie URL e Descrição)
// (Preencha com seus dados reais!)
const dadosDosServicos = {
    // Tecnologia
    "devweb": { lottie_url: "https://lottie.host/69cf9f93-daeb-416f-ad83-9f02f3bf0797/H01e5GWuWO.lottie", descricao: "Desenvolvemos sites e plataformas digitais eficientes, modernas e funcionais, transformando ideias em experiências online de impacto." },
    "automacao": { lottie_url: "https://lottie.host/bf07e128-8381-4ef4-93de-ba25422f65fa/h9AvTHjPza.lottie", descricao: "Criamos soluções de automação que simplificam processos, economizam tempo e aumentam a eficiência do seu negócio." },
    // Design
    "uxui": { lottie_url: "https://lottie.host/1943b7c7-1dde-4c7a-bc63-fcf0dd3c939d/HrXP3Fu559.lottie", descricao: "Desenvolvemos designs claros e atraentes, garantindo uma experiência fácil e agradável para os usuários." },
    "conteudo": { lottie_url: "https://lottie.host/515d8478-e01d-49b3-a5d1-e8a02b24900e/PFrB2bNUr0.lottie", descricao: "Produzimos conteúdo digital criativo e estratégico, pensado para engajar, informar e conectar sua marca com o público." },
    "branding": { lottie_url: "https://lottie.host/ef48ef01-ff4c-4ef9-ba5f-172a9a725b17/ywWOr28CNA.lottie", descricao: "Desenvolvemos identidades visuais fortes e consistentes, que transmitem os valores da sua marca e a destacam no mercado." },
    "social": { lottie_url: "https://lottie.host/ee88e57a-24b6-4bcf-a974-f909fa606b81/h6XsEGb5gv.lottie", descricao: "Gerenciamos e criamos conteúdo para redes sociais, fortalecendo a presença da sua marca e aumentando o engajamento com o público." },
    // Consultoria
    "consultoria": { lottie_url: "https://lottie.host/6643382b-4e56-44f8-8a0c-44b12ed4513a/1qc34bfaF2.lottie", descricao: "Oferecemos consultoria especializada em diversas áreas, auxiliando na tomada de decisões, otimização de processos e alcance de melhores resultados." },
    "parceiro": { lottie_url: "https://lottie.host/317aa8dc-4631-418f-b980-b356a504e668/eFCgujTrkF.lottie", descricao: "Nos tornamos parceiros estratégicos do seu negócio, colaborando de forma contínua para alcançar objetivos e impulsionar resultados de maneira prática e integrada." },
    // Idiomas
    "traducao": { lottie_url: "https://lottie.host/6031d48b-8c91-4531-b591-499d419c54de/0uqUdYb3jb.lottie", descricao: "Oferecemos serviços de tradução francês-português e atuação como intérprete, garantindo comunicação clara e precisa em contextos profissionais e culturais." },
    "mentoria": { lottie_url: "https://lottie.host/d05fa4b9-85c7-420b-af97-5a6f30520962/DWEu4MgFw8.lottie", descricao: "Mentoria em francês para comunicação prática e preparação para provas oficiais, como DELF, TEF e outros certificados internacionais." },
    "acompanhamento": { lottie_url: "https://lottie.host/ec3993c0-bafb-4610-bf84-e8203367d5f4/l0q7SMJLX3.lottie", descricao: "Acompanhamento de estudos e reforço escolar, apoiando organização, foco e preparação para provas, incluindo casos como TDAH." }
    // Lembre-se de colocar os links .lottie e textos corretos!
};

// 2. Encontra TODOS os wrappers de lista conectada (um por slide)
const wrappers = document.querySelectorAll('.lista-conectada-wrapper');

wrappers.forEach(wrapper => {
    // Encontra os elementos DENTRO DE CADA wrapper
    const itensDaLista = wrapper.querySelectorAll('.item-servico');
    const displayContainer = wrapper.querySelector('.display-servico');
    // Busca o Lottie e o P dentro do displayContainer deste wrapper
    const displayLottie = displayContainer.querySelector('dotlottie-wc'); 
    const displayDescricao = displayContainer.querySelector('p');       

    if (itensDaLista.length > 0 && displayLottie && displayDescricao) {

        // 3. Função para atualizar o display (igual a antes)
        function atualizarDisplay(key) {
            const dados = dadosDosServicos[key];
            if (dados) {
                displayContainer.classList.remove('visible');
                setTimeout(() => {
                    if (displayLottie.getAttribute('src') !== dados.lottie_url) {
                        // Verifica se o método load existe antes de chamar
                        if (typeof displayLottie.load === 'function') {
                        displayLottie.load(dados.lottie_url);
                        } else {
                           // Se não houver load, tenta setar o src diretamente (fallback)
                        displayLottie.setAttribute('src', dados.lottie_url); 
                        console.warn('dotlottie-wc: Método load() não encontrado, usando setAttribute("src").');
                        }
                    }
                    displayDescricao.innerText = dados.descricao;
                    displayContainer.classList.add('visible');
                }, 100); // Pequeno atraso para fade
            }
        }

        // 4. Adiciona os Eventos de CLIQUE
        itensDaLista.forEach(item => {
            
            item.addEventListener('click', () => { // <-- MUDANÇA AQUI
                
                // Só faz algo se o item clicado NÃO for o ativo
                if (!item.classList.contains('active')) {
                    
                    // Remove a classe 'active' de TODOS os itens NESTE wrapper
                    itensDaLista.forEach(i => i.classList.remove('active'));
                    
                    // Adiciona 'active' no item clicado
                    item.classList.add('active');
                    
                    // Pega a chave (ex: "devweb")
                    const key = item.dataset.key;
                    
                    // Atualiza o display com os dados dessa chave
                    atualizarDisplay(key);
                }
            });
        });

        // 5. Mostra o primeiro item por padrão
        const primeiroItem = wrapper.querySelector('.item-servico.active');
        if (primeiroItem) {
            const keyInicial = primeiroItem.dataset.key;
            atualizarDisplay(keyInicial);
        } else {
             // Se nenhum item começar com 'active', mostra mensagem padrão
            displayDescricao.innerText = "Clique em um serviço ao lado para ver os detalhes.";
             displayContainer.classList.add('visible'); // Garante visibilidade inicial
        }
    }
}); // Fim do loop forEach wrapper
}); // <<<<==== FIM DO 'DOMContentLoaded'