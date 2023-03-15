import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderHome, renderNavigation, renderLogin } from './middlewares/renderMiddleware.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';

page(authMiddleware);
page(renderNavigation);
page(renderHome);
page(renderLogin);

page('/', homeView);
page('/login', loginView);
page('/register', registerView)


page.start();