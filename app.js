// const inputDiv = document.createElement('div');
// const inputSpan = document.createElement('span');
// inputDiv.append(inputSpan);

// inputDiv.style.border = "1px solid red";
// inputDiv.style.padding = "10px"
// inputSpan.innerText = "Enter text";

// inputDiv.style.width = "200px";
// inputDiv.style.height = "40px";


// inputDiv.addEventListener("mousemove", function() {
//     inputDiv.style.border = "1px solid black"
// });

// inputDiv.addEventListener("mouseout", function() {
//     inputDiv.style.border = "1px solid red"
// });

// let keyDownHandler = function(e) {
//     const key = e.key;
//     inputSpan.innerText += key;
// };


// let clickHandler = function(e) {
//     console.log("div clicked")
//     inputSpan.innerText = "";

//     document.addEventListener('keydown', keyDownHandler);

//     e.stopPropagation();
// }

// inputDiv.addEventListener('click', clickHandler);

// document.body.addEventListener('click', function () {
//     console.log('body clicked');

//     document.removeEventListener('keydown', keyDownHandler);
//     // wavshalot eventi 
// });

// document.body.append(inputDiv);


// ------------------------------------------------------


/**
 * 
 *  <div> 
 *      <div class="ball position-absolute"></div>
 * </div>
 * 
 * 
 */

// draw progress bar 

const stripeDiv = document.createElement('div');
stripeDiv.style.margin = "40px";
stripeDiv.style.width = "400px";
stripeDiv.style.height = "2px";
stripeDiv.style.background = "black";
document.body.append(stripeDiv);


// separate progress bar
let separatorArray = [];
const stripeDivCoords = stripeDiv.getBoundingClientRect();
console.log(stripeDivCoords);


//separate line
function Separate(count) {
    const ballradius = 4;
    let divLength = stripeDivCoords.width;
    console.log("divLength = " + divLength);

    let xPoint = stripeDivCoords.x - ballradius;
    let yPoint = stripeDivCoords.y - ballradius + stripeDivCoords.height / 2;
    console.log(xPoint, yPoint, "jkdwnjd");

    const ballStep = divLength / count + 1;
    for (let i = 1; i < count + 1; i++) {
        let separator = GetBall(4, 'black');

        // console.log(separator, "separator");
        //separator.style.left = xPoint + 'px';
        //separator.style.top = yPoint +  'px';
        separator.SetPosition(xPoint, yPoint);

        // console.log(separator.left + " ,,,,,,,,,, " + Separate.top);
        separator.id = i;
        xPoint += ballStep + ballradius;
        // console.log("separator created" + i + " (" + xPoint + ")");
        stripeDiv.append(separator);
        separatorArray.push(separator);
    }
}

// get ball
function GetBall(radius, color = 'red') {
    let ball = document.createElement('div');
    ball.style.borderRadius = '50%';
    ball.style.backgroundColor = color;
    ball.style.width = 2 * radius + 'px';
    ball.style.height = 2 * radius + 'px';
    ball.style.position = 'absolute';
    return ball;
}

// set element position
// write extension method

Element.prototype.SetPosition = function (x = null, y = null) {
    if(x != null){
        this.style.left = x + 'px';
    }
    if(y != null){
        this.style.top = y + 'px';
    }
    
    //console.log(this.style.left + "---X---" + this.style.top);
}
Separate(9);

//create moveble ball 
const ballDiv = GetBall(10);
ballDiv.style.position = "absolute";
ballDiv.style.left = stripeDivCoords.width / 2;
ballDiv.style.top = stripeDivCoords.height / 2;
ballDiv.style.left = "50%";
ballDiv.style.marginTop = "-10px"
setCenterCoordinates(ballDiv);

function getNumberFromPx(px) {
    return Number(px.split("px")[0])
}

//get closest ball;
function getClosestBall(mouseCoordX) {
    let index = 0;
    separatorArray.forEach(function (separator, idx) {
        // 100px
        let str = "100px";
        let strWIthoutPx = str.substr(0, str.length - 2);
        if (mouseCoordX > getNumberFromPx(separator.style.left)) {
            index = idx;
        } else {
            return;
        }

    });
    return separatorArray[index];
}


function moveBaseBall(separator) {
    let x = separator.style.left;
    console.log(x);
    ballDiv.SetPosition(getNumberFromPx(x));
}

//Events
function mouseMoveHandler(event){
    let ball = getClosestBall(event.pageX);
    moveBaseBall(ball);
    //console.log(event.pageX);
}
ballDiv.addEventListener('mousedown', function(event){
    document.addEventListener('mousemove',mouseMoveHandler)
});
document.addEventListener('mouseup', function(e){
    document.removeEventListener('mousemove',mouseMoveHandler)
})

// [100, 200, 300, 500].forEach(coordX => {
//     console.log(getClosestBall(coordX));
// })

function setCenterCoordinates(div) {
    let centerX = stripeDivCoords.width / 2 - 10 + stripeDivCoords.left;
    let centerY = stripeDivCoords.height / 2 + stripeDivCoords.top;
    div.SetPosition(centerX, centerY);
}
//  const mousemoveHandler = function (e) {
//      const x = e.pageX;
//      //console.log(x);

//      const stripeDivCoords = stripeDiv.getBoundingClientRect();
//     // console.log(stripeDivCoords);

//      const leftBoundX = stripeDivCoords.x;
//      const rightBoundX = stripeDivCoords.right;

//      if (x < leftBoundX || x > rightBoundX) {
//          return;
//      }

//      ballDiv.style.left = x + 'px'; // 10 + "px" = 10px;
//  }

//  function beforeMousemoveHandler(event) {
//      mousemoveHandler(event);
//  }

//  const clickHandler = function (e) {
//      console.log('ball clicked');
//      document.addEventListener('mousemove', beforeMousemoveHandler);
//  }



//  //ballDiv.addEventListener('mousedown', beforeClickHandler);

//  function beforeMouseupHandler() {
//      console.log('mouse up')
//      document.removeEventListener('mousemove', beforeMousemoveHandler);
//  }


//  document.addEventListener('mouseup', beforeMouseupHandler)

//  // დავალება 
//  // დაყავით მოცემული progress-bar ი დონნებათ
//  // იყვეს 10 დონე
//  // ბურთის გადასვლა შეიძლებოდეს მხოლოდ დონიდან-დონეზე 
//  // დაბლა სადმე ვაჩვენოთ მოცემული დონე ნებისმიერი გადასვლის დროს

//  function moveBall() {
//      // xelovnurad davawirot 
//      //beforeClickHandler();

//      let counter = 0;
//      const interval = setInterval(() => {
//          const x = Math.floor(Math.random() * 500);
//          const y = Math.floor(Math.random() * 500);

//          // xelovnurad gavaketot mausis modzraoba 
//          beforeMousemoveHandler({ pageX: x, pageY: y });

//          if (counter++ > 20) { 
//              beforeMouseupHandler();
//              clearInterval(interval);
//          }
//      }, 200);
//  }

//  setTimeout(() => {
//      moveBall();
//      console.log("started");
//  }, 1000);

stripeDiv.append(ballDiv);
