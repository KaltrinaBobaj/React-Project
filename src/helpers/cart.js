export function exists(food, foods){
    return foods.filter(f => f.id == food.id).length >0

}