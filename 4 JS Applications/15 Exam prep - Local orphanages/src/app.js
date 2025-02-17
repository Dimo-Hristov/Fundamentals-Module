import page from '../node_modules/page/page.mjs'
import { createPostView } from '../views/createPostView.js';
import { dashboardView } from '../views/dashboardView.js';
import { detailsView } from '../views/detailsView.js';
import { loginView } from '../views/loginView.js';
import { registerView } from '../views/registerView.js';
import { logoutUser } from './api/users.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { redirectMiddleware, renderContentMiddleware, renderNavBar } from './middleware/renderMiddleware.js';



page(authMiddleware);
page(renderNavBar);
page(renderContentMiddleware);
page(redirectMiddleware);

// page('/', homeView)
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutUser);
page('/dashboard', dashboardView);
page('/create', createPostView);
page('/details/:id', detailsView);
// page('/edit/:id', editView);
// page('/delete/:id', deleteArticle);
// page('/search', searchView)


page.start();