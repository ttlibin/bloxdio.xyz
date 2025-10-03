// Bloxd io 网站交互功能

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bloxd io website loaded successfully!');
    
    // 隐藏加载动画
    setTimeout(() => {
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 500);
        }
    }, 1000); // 显示加载动画1秒
    
    // 初始化所有功能
    initGameControls();
    initScrollEffects();
    initFAQAccordion();
    initSmoothScrolling();
    initMobileMenu();
    initNavigation();
    initScrollSpy();
    initAnalytics();
});

// Google Analytics 事件追踪
function initAnalytics() {
    // 追踪游戏iframe加载
    const gameIframe = document.querySelector('.game-container iframe');
    if (gameIframe) {
        gameIframe.addEventListener('load', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'game_loaded', {
                    'event_category': 'engagement',
                    'event_label': 'bloxd_io_game'
                });
            }
        });
    }
    
    // 追踪导航点击
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation_click', {
                    'event_category': 'navigation',
                    'event_label': linkText
                });
            }
        });
    });
    
    // 追踪FAQ展开
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'faq_expand', {
                        'event_category': 'engagement',
                        'event_label': this.textContent.trim()
                    });
                }
            });
        }
    });
    
    // 追踪全屏按钮点击
    const fullscreenBtn = document.querySelector('.btn-fullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'fullscreen_toggle', {
                    'event_category': 'game_interaction',
                    'event_label': 'fullscreen_button'
                });
            }
        });
    }
    
    // 追踪移动端菜单
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'mobile_menu_toggle', {
                    'event_category': 'navigation',
                    'event_label': 'mobile_menu'
                });
            }
        });
    }
}

// 游戏控制功能
function initGameControls() {
    const gameIframe = document.querySelector('.game-container iframe');
    const fullscreenBtn = document.querySelector('.btn-fullscreen');
    
    // 全屏功能
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
}

// 切换全屏模式
function toggleFullscreen() {
    const gameContainer = document.querySelector('.game-container');
    
    if (!document.fullscreenElement) {
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.webkitRequestFullscreen) {
            gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) {
            gameContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


// 滚动效果
function initScrollEffects() {
    // 创建观察器来添加滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.mode-card, .feature-card, .faq-item, .guide-section');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// FAQ手风琴效果
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // 初始状态隐藏答案
            answer.style.display = 'none';
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            
            // 添加点击事件
            question.style.cursor = 'pointer';
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                if (isOpen) {
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    setTimeout(() => {
                        answer.style.display = 'none';
                    }, 300);
                } else {
                    answer.style.display = 'block';
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }
            });
        }
    });
}

// 平滑滚动
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #00d4ff, #00ff88);
        color: #000;
        padding: 15px 25px;
        border-radius: 25px;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 游戏iframe加载状态
function handleGameLoad() {
    const iframe = document.querySelector('.game-container iframe');
    if (iframe) {
        iframe.addEventListener('load', () => {
            console.log('Game loaded successfully!');
            showNotification('🎮 游戏加载完成！');
        });
        
        iframe.addEventListener('error', () => {
            console.error('Game failed to load');
            showNotification('❌ 游戏加载失败，请刷新页面重试', 'error');
        });
    }
}

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // F键 - 全屏
    if (e.key === 'F' || e.key === 'f') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleFullscreen();
        }
    }
    
    // R键 - 重新加载游戏
    if (e.key === 'R' || e.key === 'r') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            startNewGame();
        }
    }
    
    // ESC键 - 退出全屏
    if (e.key === 'Escape') {
        if (document.fullscreenElement) {
            toggleFullscreen();
        }
    }
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - pausing game');
    } else {
        console.log('Page visible - resuming game');
    }
});

// 窗口大小变化处理
window.addEventListener('resize', () => {
    const iframe = document.querySelector('.game-container iframe');
    if (iframe) {
        // 重新计算iframe尺寸
        const container = iframe.parentElement;
        const containerWidth = container.offsetWidth;
        
        // 保持16:9比例
        const aspectRatio = 16 / 9;
        const newHeight = Math.min(containerWidth / aspectRatio, 1080);
        
        if (window.innerWidth <= 768) {
            iframe.style.height = '400px';
        } else if (window.innerWidth <= 1200) {
            iframe.style.height = '600px';
        } else {
            iframe.style.height = '800px';
        }
    }
});

// 初始化游戏加载处理
handleGameLoad();

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 检查是否是外部链接（包含.html或http）
            if (href.includes('.html') || href.startsWith('http')) {
                // 外部链接，允许默认行为
                console.log(`Navigating to external page: ${href}`);
                return; // 不阻止默认行为
            }
            
            // 内部锚点链接处理
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 计算目标位置，考虑固定标题栏的高度
                const headerHeight = 60;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`Navigating to section: ${targetId}`);
            } else {
                console.warn(`Target element not found: ${targetId}`);
            }
            
            // 关闭移动端菜单
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            
            // 更新活动链接
            updateActiveLink(link);
        });
    });
}

function updateActiveLink(activeLink) {
    const allLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    allLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// 滚动监听功能
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 80; // 考虑标题栏高度
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 更新对应的导航链接
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', updateActiveSection);
    
    // 初始化时检查当前活动部分
    updateActiveSection();
}

// 导出函数供全局使用
window.toggleFullscreen = toggleFullscreen;
window.toggleMobileMenu = toggleMobileMenu;
