// ЕДИНЫЙ СКРИПТ ДЛЯ САЙТА ГАДЖИ ЛАТИПОВА
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Гаджи Латипова загружен!');
    
    // ========== ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ ==========
    let lastScrollY = 0;
    let ticking = false;
    
    // ========== ОСНОВНЫЕ ЭЛЕМЕНТЫ ==========
    const quickNav = document.querySelector('.quick-nav');
    const navToggleBtn = document.querySelector('.nav-toggle-btn');
    const navMinimize = document.querySelector('.nav-minimize');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    const mobileClose = document.querySelector('.mobile-nav-close');
    const emailLink = document.querySelector('.email-elegant');
    const titleElement = document.querySelector('.title-pulse-glitch');
    const navCloseBtn = document.querySelector('.nav-close-btn');
    
    // Проверяем наличие элементов
    console.log('Элементы найдены:', {
        quickNav: !!quickNav,
        navToggleBtn: !!navToggleBtn,
        navCloseBtn: !!navCloseBtn,
        mobileToggle: !!mobileToggle,
        mobileMenu: !!mobileMenu
    });
    
    // ========== ИНИЦИАЛИЗАЦИЯ ПРОЕКТОВ ==========
    const projects = document.querySelectorAll('.full-width-project');
    projects.forEach((project, index) => {
        project.id = `project-${index + 1}`;
    });
    
    // ========== ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ВИДИМОСТИ ==========
    function initializeVisibility() {
        const isMobile = window.innerWidth <= 992;
        
        console.log('Инициализация видимости, мобильный:', isMobile);
        
        if (isMobile) {
            // На мобильных устройствах
            if (quickNav) {
                quickNav.style.display = 'none';
                quickNav.style.opacity = '0';
                quickNav.style.transform = 'translateX(100%)';
            }
            
            if (navToggleBtn) {
                navToggleBtn.style.display = 'none';
            }
            
            if (mobileToggle) {
                mobileToggle.style.display = 'flex';
            }
        } else {
            // На десктопных устройствах
            if (quickNav) {
                quickNav.style.display = 'none'; // Скрываем полностью
                quickNav.style.opacity = '0';
                quickNav.style.transform = 'translateX(100%)';
                quickNav.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                quickNav.style.position = 'fixed';
                quickNav.style.top = '50%';
                quickNav.style.right = '0';
                quickNav.style.transform = 'translate(100%, -50%)';
                quickNav.style.zIndex = '999';
            }
            
            if (navToggleBtn) {
                navToggleBtn.style.display = 'flex';
                navToggleBtn.style.position = 'fixed';
                navToggleBtn.style.top = '50%';
                navToggleBtn.style.right = '0';
                navToggleBtn.style.transform = 'translateY(-50%)';
                navToggleBtn.style.zIndex = '1000';
                navToggleBtn.style.animation = 'buttonGlow 3s infinite alternate';
            }
            
            if (mobileToggle) {
                mobileToggle.style.display = 'none';
            }
        }
    }
    
    // ========== ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ПАНЕЛИ НАВИГАЦИИ ==========
    function togglePanel() {
        const isMobile = window.innerWidth <= 992;
        
        if (isMobile) {
            // На мобильных открываем мобильное меню
            if (mobileMenu) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            return;
        }
        
        // На десктопе работаем с панелью навигации
        if (!quickNav || !navToggleBtn) return;
        
        const isExpanded = quickNav.classList.contains('expanded');
        
        if (isExpanded) {
            // Закрываем панель - сдвигаем вправо за экран
            quickNav.classList.remove('expanded');
            quickNav.style.transform = 'translate(100%, -50%)';
            quickNav.style.opacity = '0';
            quickNav.style.pointerEvents = 'none';
            
            // Возвращаем кнопку в исходное состояние
            const chevron = navToggleBtn.querySelector('.fa-chevron-right');
            if (chevron) {
                chevron.style.transform = 'rotate(0deg)';
            }
            
            console.log('Панель навигации полностью скрыта');
        } else {
            // Открываем панель - показываем по центру справа
            quickNav.classList.add('expanded');
            quickNav.style.display = 'block';
            quickNav.style.transform = 'translate(0, -50%)';
            quickNav.style.opacity = '0.9';
            quickNav.style.pointerEvents = 'auto';
            
            // Поворачиваем шеврон
            const chevron = navToggleBtn.querySelector('.fa-chevron-right');
            if (chevron) {
                chevron.style.transform = 'rotate(180deg)';
            }
            
            console.log('Панель навигации полностью открыта по центру');
        }
    }
    
    // ========== КНОПКА ПЕРЕКЛЮЧЕНИЯ НАВИГАЦИИ (ПК) ==========
    if (navToggleBtn) {
        navToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Кнопка "Навигация" нажата');
            togglePanel();
        });
    }
    
    // ========== КНОПКА ЗАКРЫТИЯ ВНУТРИ ПАНЕЛИ ==========
    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isMobile = window.innerWidth <= 992;
            
            if (isMobile) {
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                return;
            }
            
            if (quickNav) {
                quickNav.classList.remove('expanded');
                quickNav.style.transform = 'translate(100%, -50%)';
                quickNav.style.opacity = '0';
                quickNav.style.pointerEvents = 'none';
                
                const chevron = navToggleBtn ? navToggleBtn.querySelector('.fa-chevron-right') : null;
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
                console.log('Панель закрыта изнутри');
            }
        });
    }
    
    // ========== КНОПКА СВОРАЧИВАНИЯ ==========
    if (navMinimize) {
        navMinimize.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isMobile = window.innerWidth <= 992;
            
            if (isMobile) return; // На мобильных не обрабатываем
            
            if (quickNav) {
                quickNav.classList.remove('expanded');
                quickNav.style.transform = 'translate(100%, -50%)';
                quickNav.style.opacity = '0';
                quickNav.style.pointerEvents = 'none';
                
                const chevron = navToggleBtn ? navToggleBtn.querySelector('.fa-chevron-right') : null;
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
    
    // ========== ЗАКРЫТИЕ ПАНЕЛИ ПРИ КЛИКЕ ВНЕ ЕЕ ==========
    document.addEventListener('click', function(e) {
        const isMobile = window.innerWidth <= 992;
        
        if (isMobile) {
            // На мобильных закрываем мобильное меню
            if (mobileMenu && 
                mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !(mobileToggle && mobileToggle.contains(e.target))) {
                
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        } else {
            // На десктопе закрываем панель навигации
            if (quickNav && 
                quickNav.classList.contains('expanded') && 
                !quickNav.contains(e.target) && 
                !(navToggleBtn && navToggleBtn.contains(e.target))) {
                
                quickNav.classList.remove('expanded');
                quickNav.style.transform = 'translate(100%, -50%)';
                quickNav.style.opacity = '0';
                quickNav.style.pointerEvents = 'none';
                
                const chevron = navToggleBtn ? navToggleBtn.querySelector('.fa-chevron-right') : null;
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
                console.log('Панель закрыта при клике вне ее');
            }
        }
    });
    
    // ========== ФУНКЦИЯ ПЕРЕХОДА К ПРОЕКТУ ==========
    function scrollToProject(projectId) {
        const target = document.querySelector(projectId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // ========== НАВИГАЦИЯ ПО ПРОЕКТАМ (ПК) ==========
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                scrollToProject(targetId);
                // Закрываем панель после выбора проекта
                const isMobile = window.innerWidth <= 992;
                
                if (!isMobile && quickNav) {
                    quickNav.classList.remove('expanded');
                    quickNav.style.transform = 'translate(100%, -50%)';
                    quickNav.style.opacity = '0';
                    quickNav.style.pointerEvents = 'none';
                    
                    const chevron = navToggleBtn ? navToggleBtn.querySelector('.fa-chevron-right') : null;
                    if (chevron) {
                        chevron.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    });
    
    // ========== МОБИЛЬНАЯ НАВИГАЦИЯ ==========
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Кнопка мобильной навигации нажата');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // ========== МОБИЛЬНАЯ НАВИГАЦИЯ ПО ПРОЕКТАМ ==========
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const targetId = this.getAttribute('href');
            if (targetId) {
                setTimeout(() => scrollToProject(targetId), 300);
            }
        });
    });
    
    // ========== ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ ПРИ КЛИКЕ ВНЕ ЕГО ==========
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ========== ОБНОВЛЕНИЕ АКТИВНОГО ПРОЕКТА ПРИ СКРОЛЛЕ ==========
    function updateActiveProject() {
        const scrollPosition = window.scrollY + 100;
        
        projects.forEach((project, index) => {
            const projectTop = project.offsetTop;
            const projectBottom = projectTop + project.offsetHeight;
            
            if (scrollPosition >= projectTop && scrollPosition < projectBottom) {
                // Убираем активный класс у всех
                document.querySelectorAll('.nav-list li, .mobile-nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Добавляем активный класс к текущему
                const pcItem = document.querySelector(`.nav-list a[href="#project-${index + 1}"]`)?.parentElement;
                const mobileItem = document.querySelector(`.mobile-nav-item[href="#project-${index + 1}"]`);
                
                if (pcItem) pcItem.classList.add('active');
                if (mobileItem) mobileItem.classList.add('active');
            }
        });
    }
    
    // ========== ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ==========
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => observer.observe(element));
    
    // ========== ПАРАЛЛАКС ДЛЯ СЕТКИ ==========
    document.addEventListener('mousemove', (e) => {
        const grid = document.querySelector('.elegant-grid');
        if (grid) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            grid.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
    });
    
    // ========== ЭФФЕКТ ПРИ НАВЕДЕНИИ НА EMAIL ==========
    if (emailLink) {
        emailLink.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        emailLink.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // ========== ЭФФЕКТ ПРИ НАВЕДЕНИИ НА СКИЛЛЫ ==========
    document.querySelectorAll('.skill-chip').forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ========== АНИМАЦИЯ ЗАГОЛОВКА ==========
    if (titleElement) {
        setInterval(() => {
            if (Math.random() > 0.5) {
                titleElement.style.animation = 'none';
                setTimeout(() => {
                    titleElement.style.animation = 
                        'neonPulse 3s ease-in-out infinite alternate, glitchShift 5s infinite';
                }, 50);
            }
        }, 5000);
    }
    
    // ========== ЭФФЕКТЫ ДЛЯ ПРОЕКТОВ ==========
    projects.forEach(project => {
        // Наведение на проект
        project.addEventListener('mouseenter', function() {
            const indicator = this.querySelector('.status-dot');
            if (indicator) {
                const color = getComputedStyle(indicator).color;
                this.style.borderLeftWidth = '10px';
                this.style.borderLeftColor = color;
            }
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '5px';
        });
        
        // Клик на проект
        project.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            this.style.transform = 'translateX(10px) scale(1.01)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            const indicator = this.querySelector('.status-dot');
            if (indicator) {
                indicator.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    indicator.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
    
    // ========== ПОСТЕПЕННОЕ ПОЯВЛЕНИЕ ПРОЕКТОВ ==========
    window.addEventListener('load', function() {
        projects.forEach((project, index) => {
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
    
    // ========== СЛУЧАЙНОЕ МЕРЦАНИЕ КАРТОЧЕК ==========
    setInterval(() => {
        if (Math.random() > 0.7 && projects.length > 0) {
            const randomCard = projects[Math.floor(Math.random() * projects.length)];
            randomCard.style.boxShadow = '0 0 40px rgba(0, 224, 255, 0.9)';
            
            setTimeout(() => {
                randomCard.style.boxShadow = '';
            }, 300);
        }
    }, 2000);
    
    // ========== ОБНОВЛЕНИЕ ПРОЕКТОВ ПРИ СКРОЛЛЕ ==========
    function updateProjectsOnScroll() {
        const windowHeight = window.innerHeight;
        
        projects.forEach(project => {
            const rect = project.getBoundingClientRect();
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const centerThreshold = windowHeight / 2;
                const distanceFromCenter = Math.abs(rect.top + rect.height/2 - centerThreshold);
                const intensity = Math.max(0, 1 - distanceFromCenter / centerThreshold);
                
                if (intensity > 0.3) {
                    project.style.boxShadow = `0 0 ${30 * intensity}px rgba(255, 255, 255, 0.2)`;
                } else {
                    project.style.boxShadow = 'none';
                }
            }
        });
    }
    
    // ========== ОБРАБОТЧИК СКРОЛЛА ==========
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveProject();
                updateProjectsOnScroll();
                ticking = false;
            });
            ticking = true;
        }
        
        lastScrollY = window.scrollY;
    });
    
    // ========== АДАПТАЦИЯ ПОД РАЗМЕР ЭКРАНА ==========
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initializeVisibility();
            updateActiveProject();
        }, 250);
    });
    
    // ========== ЗАКРЫТИЕ ПО КЛАВИШЕ ESCAPE ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const isMobile = window.innerWidth <= 992;
            
            if (isMobile) {
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            } else {
                if (quickNav && quickNav.classList.contains('expanded')) {
                    quickNav.classList.remove('expanded');
                    quickNav.style.transform = 'translate(100%, -50%)';
                    quickNav.style.opacity = '0';
                    quickNav.style.pointerEvents = 'none';
                    
                    const chevron = navToggleBtn ? navToggleBtn.querySelector('.fa-chevron-right') : null;
                    if (chevron) {
                        chevron.style.transform = 'rotate(0deg)';
                    }
                }
            }
        }
    });
    
    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    initializeVisibility();
    updateActiveProject();
    
    // Устанавливаем год в футере
    const yearElement = document.querySelector('.gradient-text');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} ГАДЖИ ЛАТИПОВ | САНКТ-ПЕТЕРБУРГ | ВСЕ ПРАВА ЗАЩИЩЕНЫ`;
    }
    
    // ========== ДОПОЛНИТЕЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ==========
    // Обновляем при загрузке страницы
    setTimeout(() => {
        updateActiveProject();
        initializeVisibility();
    }, 100);
    
    // ========== ЛОГИ ==========
    console.log('Навигация успешно инициализирована');
    console.log('Количество проектов:', projects.length);
});