// Selector for all of HTML elements we use
const squares = document.querySelectorAll(".square");
const targetText = document.querySelector("#target");
const resultText = document.querySelector("#result_text");
const resetButton = document.querySelector("#reset_game");
const diffButtons = document.querySelectorAll(".diff");
// Controller to encapsulate all logic, and make it hidden
const controller = (function(){
    let diffHard=true;
    const hardSquares = 6;
    const easySquares = 3;
    let colors;
    let pickedColor;
    //Object encapsulating all public methods we want to pass on
    const publicAPI = {
        init(){
            setupResetBut();
            setupDiffButs();
            setupSquares();
            setColors();
        }
    }
    //Three functions setting up controllers to all of the buttons
    function setupResetBut(){
        resetButton.addEventListener("click",setColors)
    }
    function setupDiffButs(){
        for(let i=0;i<diffButtons.length;i++){
            diffButtons[i].addEventListener("click",function(){
                for(let i=0;i<diffButtons.length;i++){
                    if(diffButtons[i]===this){
                        diffButtons[i].classList.add("selected");
                        this.textContent==="Hard" ? diffHard = true : diffHard=false;
                    }else{
                        diffButtons[i].classList.remove("selected");
                    }
                }
                setColors();
            });
        }
    }
    function setupSquares(){
        for(let i =0;i<squares.length;i++){
            squares[i].addEventListener("click",function(){
                var chosen = this.style.backgroundColor;
                if(chosen===pickedColor){
                    resultText.textContent="You've won!";
                    resetButton.textContent = "Try again?";
                    changeColorsWin(pickedColor);
                }else{
                    this.style.backgroundColor = "#232323";
                    resultText.textContent="Try again!";
                }
            });
        }
    }
    function setColors(){
        if(diffHard){
            colors = genRandomColors(hardSquares);
        }else{
            colors = genRandomColors(easySquares);
        }  
        pickedColor = pickWinningColor();
        targetText.textContent=pickedColor;
        for(let i =0;i<squares.length;i++){
            if(colors[i]){
                squares[i].style.backgroundColor = colors[i];
                squares[i].style.display = "block";
            }else{
                squares[i].style.display = "none";
            }
        }
        resultText.textContent="";
        resetButton.textContent = "New Colors";
        document.querySelector("h1").style.backgroundColor="steelblue";
    }
    //Function to change color of all squares to final color, if you win the game
    function changeColorsWin(color){
        for(let i =0;i<squares.length;i++){
            squares[i].style.backgroundColor=color;
        }
        document.querySelector("h1").style.backgroundColor=color;
    }
    //We use it to choose which color will be winning one
    function pickWinningColor(){
        const result = Math.floor(Math.random() * colors.length);
        return colors[result];
    }
    //Function to generate array of random colors
    function genRandomColors(numColors){
        let result = [];
        for(var i=0;i<numColors;i++){
             result.push(generateColor());
        }
        return result;
    }
    //Generation of color string
    function generateColor(){
        const color="rgb("+genColorVal()+", "+genColorVal()+", "+genColorVal()+")";
        return color;
    }
    //Generation of one of three values of color
    function genColorVal(){
        return Math.floor(Math.random() * 256);
    }

    return publicAPI;
})();
controller.init();




