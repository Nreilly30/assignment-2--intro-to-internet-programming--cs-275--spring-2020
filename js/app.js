const riceToWater = () => {
    const typeOfRice = document.querySelector(`input[name=rice]:checked`).value;
    const amountRice = document.querySelector(`#amount-rice`).value;
    const waterRatio = document.querySelector(`#water-ratio`);
    let amountWater;

    if (typeOfRice === `white`) {
        // ratio 2:1    water : rice
        amountWater = amountRice * 2;
        waterRatio.innerHTML = `<p>The water to rice ratio for white rice is 2:1.
        </p> <p>For ${amountRice} cup(s) of rice you need ${amountWater} cups of
        water.</p>`;
    } else if (typeOfRice === `sprouted`) {
        //1 1/4 cups of rice with 2 cups of water
        amountWater = amountRice * 1.6;
        waterRatio.innerHTML = `<p>The water to rice ratio for Sprouted California
        Rice is 2:1.25.</p> <p>For ${amountRice} cup(s) of rice you need
        ${amountWater} cups of water.</p>`;

    }
};

const changeRice = () => {
    const typeOfRice = document.querySelector(`input[name=rice]:checked`).value;
    const heading = document.querySelector(`#heading`);
    const instructions = document.querySelector(`#instructions`);

    if (typeOfRice === `white`) {
        heading.innerHTML = `Making White Rice`;
        instructions.innerHTML = `Combine 1 cup of rice with 2 cups of water and 1
        Tbsp olive oil. Bring to a boil, then reduce heat to the lowest setting.
            Cook for about 18 minutes.`;

    } else if (typeOfRice === `sprouted`) {
        heading.innerHTML = `Making Sprouted California Rice`;
        instructions.innerHTML = `<p>For slightly al dente rice: Combine 1 1/4 cups
        of rice with 2 cups of water or broth and 1 Tbsp olive oil. Bring to a boil
        and stir once to mix. Reduce heat to low, cover with a tight-fitting lid and
        cook for 25 minutes. Remove from heat and let stand for 5 minutes. Fluff
        with a fork and serve.</p><p>For softer rice: Increase liquid by 1/2 cup
        and cook time by 5 minutes.</p>`;
    }

    riceToWater();
};

window.addEventListener(`load`, () => {
    changeRice();
    riceToWater();
});
