
## Overview
Display the list of cats and when hover the mouse then some zoom the image and when click then open the preview of the cats and show all off details that have. Also can sort or filter the data and the app have the 'day mode' and 'night mode'.

<hr />

## Setup Instructions
<ul>
  <li>git clone https://github.com/Tanjinhossain1/cats-pro.git</li> run it in terminal and go to that path -> cd cats-pro and to see the code type code .
  <li><b>npm install</b></li> install all off Dependencies for working all of functionality
  <li><b>npm run dev</b></li> start the app in local and see the ui
</ul>
I add the .env file in my code and use that for data fetching but i can't give it in .gitignore because of test and no need to create .env file it already there just run the app after install the dependencies
<hr />

##Dependencies
<ul>
  <li><b>React</b></li> React latest version (next)
  <li><b>Typescript</b></li> Using typescript for safety the data type and codes
  <li><b>Axios</b></li> For fetch the data from api
  <li><b>Material Ui</b></li> Using this for user interface and using style or components i will use many components of material ui
  <li><b>toolpad</b></li> this for layout 
</ul>

<hr />

## Features:
<ol>
  <li>Display the list of cats with pagination </li>
  <li>You can see the data with sorting and search with the breeds </li>
  <li>When lick any image then in right side see the details of cat with image also that you can close</li>
  <li>Also have day mode and night mode what ever you want it's can switch to day and night</li>
  <li>Make it Responsive in for all Devices </li>
  <li>Make the ui so simple and try to make it user friendly </li>
</ol>

<hr />

## Code Structure
<ul>
  <li>In <b>src/app/page</b> here just add the layout and add component that show the list of images </li>
  <li><b>src/components/TheamProvider.tsx</b> here i add the theme of material ui and add toolpad Provider and add to the src/app/layout.tsx</li>
  <li><b>src/components/HomePage/ListOfCats.tsx</b> The main component that show the list of cats <b>paginations filtering</b> and fetch the data from api</li>
  <li><b>src/components/HomePage/DetailsDrawer.tsx</b> This component is use in ListOfCats for show the details of cats in right side drawer</li>
  <li><b>src/types/CatsType.ts</b> Here have the type that i use in my project.</li>
</ul>





