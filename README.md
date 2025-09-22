# 🛒 E-Commerce App (Angular)

A modern, responsive **E-Commerce web application** built with **Angular 20**, **Bootstrap 5**, and the [DummyJSON API](https://dummyjson.com/).

---

## 🚀 Features

- 🔑 **Authentication**

  - User Sign Up & Login using [DummyJSON Auth API](https://dummyjson.com/docs/auth)
  - Auto-login after registration
  - LocalStorage persistence (keeps session after refresh)

- 🛍️ **Product Catalog**

  - Fetch products from DummyJSON API
  - Product details modal
  - Responsive grid using Bootstrap

- 🛒 **Shopping Cart**

  - Add/remove products to cart
  - Update product quantity
  - Cart stored in LocalStorage for persistence
  - Dynamic total price calculation

- 📦 **Checkout**

  - Requires login
  - Clears cart after successful checkout
  - Shows confirmation message

- 🎨 **UI/UX**
  - Responsive Bootstrap 5 design
  - Navbar with login/logout/profile detection
  - Modal-based Login & Signup forms

---

## 🛠️ Tech Stack

- **Frontend Framework:** Angular 20
- **UI Library:** Bootstrap 5, Bootstrap Icons
- **API:** [DummyJSON](https://dummyjson.com/)
- **State Management:** LocalStorage for cart & user session
- **Routing:** Angular Router

---

## ⚡ Development Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/angular-ecommerce.git
cd angular-ecommerce
```

## Install Angular CLI (if not already):

```bash
npm install -g @angular/cli
```

## Install project dependencies:

```bash
npm install
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
