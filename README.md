# PolyDash - Campus Food Delivery App

Our product, PolyDash, is for students/professors who don’t feel like walking to on campus dining restaurants due to other priorities. Unlike other delivery service products like Doordash or Grubhub, PolyDash is a delivery application that is well integrated into Cal Poly’s dining system and students have the option of using dining dollars to pay for their orders. It will work with any campus dining restaurants and will deliver to anywhere on campus, truly being made for the convenience of Cal Poly persona.

## Table of Contents
- [Developers](#developers)
- [UI Prototype](#ui-prototype)
- [Development Environment Setup](#development-environment-setup)
- [Diagrams](#diagrams)
- [Continuous Deployment](#continuous-deployment)

## Developers
- Garrett
- Vasanth
- Han
- Alex
- Adi

## UI Prototype
Look at our Figma page to view the original vision of this of this project: [PolyDash UI Prototype](https://www.figma.com/file/BB41cMHSl38Hl7sHfHUFeh/PolyDash?type=design&node-id=0%3A1&mode=design&t=TZetoqwEJhIsVlU1-1)

## Development Environment Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/gartpr/polydash
   cd polydash
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   cd frontend
   npm install
   ```
3. **Enable Eslint:**
 - Go to Preferences in VSCode -> Search "Code Actions on Save" -> Click "Edit in settings.json"
 - Add this code to settings.json:
   
   ```bash
   "editor.codeActionsOnSave": {
   "source.fixAll.eslint": true,
   "source.fixAll.stylelint": true
   }
   ```
 - Save settings.json

4. **Run the Development Environment:**
   ```bash
   cd frontend
   npm start
   ```

## Diagrams

For more detailed information about the project architecture and object diagrams, check out our [Wiki Page](https://github.com/gartpr/polydash/wiki).

## Continuous Deployment

View our hosted website here [Polydash](https://proud-water-08819841e.4.azurestaticapps.net).
