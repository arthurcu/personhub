// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // 滚动进度指示器
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    createScrollProgress();
    
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // 平滑滚动导航
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });
    
    // 返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 滚动动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 为时间线项目添加延迟动画
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
                
                // 为卡片添加交错动画
                if (entry.target.classList.contains('research-card') || 
                    entry.target.classList.contains('award-card') ||
                    entry.target.classList.contains('story-card') ||
                    entry.target.classList.contains('impact-card')) {
                    const cards = entry.target.parentNode.children;
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.fade-in, .timeline-item, .research-card, .award-card, .story-card, .impact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 鼠标跟随效果
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    // 卡片悬停时的3D效果
    const cards = document.querySelectorAll('.research-card, .award-card, .story-card, .impact-card, .timeline-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // 打字机效果
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // 数字动画计数器
    function animateCounter(element, start, end, duration = 2000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // 当统计数据进入视野时启动计数动画
    const statCards = document.querySelectorAll('.stat-card');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.text-3xl');
                const text = numberElement.textContent;
                
                if (text.includes('71')) {
                    animateCounter(numberElement, 0, 71, 1500);
                } else if (text.includes('71万+')) {
                    animateCounter(numberElement, 0, 71, 1500);
                    setTimeout(() => {
                        numberElement.textContent = '71万+';
                    }, 1500);
                } else if (text.includes('5+')) {
                    animateCounter(numberElement, 0, 5, 1000);
                    setTimeout(() => {
                        numberElement.textContent = '5+';
                    }, 1000);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
    
    // 页面加载完成后的动画
    window.addEventListener('load', function() {
        // 移除加载动画
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => {
            el.classList.remove('loading');
        });
        
        // 启动英雄区域动画
        const heroElements = document.querySelector('#hero .fade-in');
        if (heroElements) {
            heroElements.style.animation = 'fadeInUp 1.2s ease-out';
        }
    });
    
    // 创建浮动几何形状背景
    function createFloatingShapes() {
        const heroSection = document.querySelector('#hero');
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        
        for (let i = 0; i < 9; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            shape.style.width = Math.random() * 20 + 10 + 'px';
            shape.style.height = shape.style.width;
            shape.style.background = `linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))`;
            shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%';
            shape.style.animationDuration = (Math.random() * 10 + 15) + 's';
            shape.style.animationDelay = Math.random() * 20 + 's';
            
            shapesContainer.appendChild(shape);
        }
        
        heroSection.appendChild(shapesContainer);
    }
    
    createFloatingShapes();
    
    // 图片懒加载
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.setAttribute('data-loaded', 'true');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.setAttribute('data-loaded', 'false');
        imageObserver.observe(img);
    });
    
    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
        
        // 空格键暂停/播放动画
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            const animatedElements = document.querySelectorAll('[style*="animation"]');
            animatedElements.forEach(el => {
                if (el.style.animationPlayState === 'paused') {
                    el.style.animationPlayState = 'running';
                } else {
                    el.style.animationPlayState = 'paused';
                }
            });
        }
    });
    
    // 性能优化：节流滚动事件
    let ticking = false;
    
    function updateScrollEffects() {
        // 所有滚动相关的更新都在这里执行
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // 添加访问统计
    console.log('🎉 何凯明个人网站已加载完成');
    console.log('📊 页面性能统计:', {
        'DOM节点数': document.querySelectorAll('*').length,
        '图片数量': document.querySelectorAll('img').length,
        '动画元素': document.querySelectorAll('[class*="animate"]').length
    });
});

// 工具函数
const utils = {
    // 防抖函数
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 检测设备类型
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // 检测是否支持触摸
    isTouch: function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
};

// 导出工具函数供全局使用
window.utils = utils;
