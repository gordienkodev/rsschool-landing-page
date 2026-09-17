const THEME_STORAGE_KEY = 'coffee-house-theme';
const THEMES = ['light', 'dark'];

function getStoredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    return THEMES.includes(savedTheme) ? savedTheme : 'light';
}

function updateThemeToggle(theme) {
    const themeButtons = document.querySelectorAll('[data-theme-toggle]');

    themeButtons.forEach((button) => {
        const isActive = button.dataset.themeToggle === theme;

        button.classList.toggle('theme-toggle__button-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function updateLogo(theme) {
    const logo = document.querySelector('[data-logo-light][data-logo-dark]');

    if (!logo) return;

    logo.src = theme === 'dark' ? logo.dataset.logoDark : logo.dataset.logoLight;
}

function applyTheme(theme, shouldSave = false) {
    const nextTheme = THEMES.includes(theme) ? theme : 'light';

    document.documentElement.dataset.theme = nextTheme;

    if (shouldSave) {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    }

    updateThemeToggle(nextTheme);
    updateLogo(nextTheme);
}

function initThemeToggle() {
    const themeButtons = document.querySelectorAll('[data-theme-toggle]');

    applyTheme(getStoredTheme());

    themeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            applyTheme(button.dataset.themeToggle, true);
        });
    });
}

initThemeToggle();
