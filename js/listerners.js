// vars for handling inputs


function addListeners(player) {

    window.onkeydown = (evt) => {
        
        // only one key at a time
        switch (evt.key) {
            case "ArrowUp":
                player.vy = -player.speed;
                break;
            case "ArrowDown":
                player.vy = player.speed;
                break;
            case "ArrowLeft":
                player.vx = -player.speed;
                break;
            case "ArrowRight":
                player.vx = player.speed;
                break;
            case " ":
                player.placeBomb();
                break;
            case "r":
                //reload the page html
                window.location.reload();
                break;
            default:
                break;
        }
    }
    window.onkeyup = (evt) => {
        switch (evt.key) {
            case "ArrowUp":
                player.vy = 0;
                break;
            case "ArrowDown":
                player.vy = 0;
                break;
            case "ArrowLeft":
                player.vx = 0;
                break;
            case "ArrowRight":
                player.vx = 0;
                break;
            default:
                break;
        }
    }
}

export {addListeners}
