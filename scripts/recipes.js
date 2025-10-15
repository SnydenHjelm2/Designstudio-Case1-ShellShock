async function getRecipes(ingred) {
    let req = new Request(`https://api.api-ninjas.com/v2/recipe?title="${ingred}"`, {
        method: "GET",
        headers: {"X-Api-Key": "zthS6Z89qGOqf5wdjglxug==A0CO1dTYHw8PpEmr"}
    });

    let resp = await fetch(req);
    if (resp.ok) {
        let reso = await resp.json();
        console.log(reso);
    } else {
        console.log("err");
    }
}