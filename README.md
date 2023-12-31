# Hospital Bag Checklist

The Hospital Bag Checklist is a web application designed to help expectant mothers (and their partners) prepare for their upcoming hospital stay when welcoming a new baby. The app provides an interactive checklist for organizing and tracking items that need to be packed for the hospital.

<strong>(I created the application because my wife got pregnant with our first child and we needed a note-taking app that we can both follow the organisation of the hospital stay bag through our phones in real-time.)</strong>

## Features

- **User-Friendly Interface**: A clean and intuitive UI to view and manage checklist items.
- **CRUD Operations**: Create, read, update, and delete items from the checklist.
- **Categorized Sections**: Items are categorized for easy organization (e.g., Things for Mama, Things for Baby, etc.).
- **Responsive Design**: Works on both desktop and mobile devices.
- **Local Storage**: All data is stored in a local SQLite database.

## Getting Started

To get started with the Hospital Bag Checklist, clone the repository to your local machine and follow the setup instructions below.

### Prerequisites

- A web server with PHP support (e.g., Apache with XAMPP).
- SQLite3 PHP extension enabled.

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/hospital-bag-checklist.git
```

2. Move the project directory to your web server's root directory (e.g., `htdocs` in XAMPP).

3. Ensure the SQLite3 extension is enabled in your PHP configuration.

4. Start your web server and navigate to the project in your web browser.

```plaintext
http://localhost/Hospital%20Bag%20Checklist/
```

## Usage

- To add an item, click the 'Add' button in the corresponding category section.
- To mark an item as packed, click the checkbox next to the item name.
- To edit an item, click the 'Edit' button and enter the new name.
- To delete an item, click the 'Delete' button.

## Contributing

Contributions to the Hospital Bag Checklist are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Radoslav Sheytanov-Ruxton - [radoslav@programmer.net](mailto:radoslav@programmer.net)

## Acknowledgments

- Bootstrap 5 for the responsive UI components.
- SQLite for the simple and robust database storage.

- User Authentification will be added in future for more confidential work between the couple.
