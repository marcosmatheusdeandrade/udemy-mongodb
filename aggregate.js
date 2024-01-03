//Exercicio com aggregates, projeção de dados e condicionais para exibição do pokemon vencedor

db.combats.aggregate([
{
    $lookup: {
        from: "pokemon",
        localField: "First_pokemon",
        foreignField: "_id",
        as: "pokemon1_array"
    }
},
{
    $lookup: {
        from: "pokemon",
        localField: "Second_pokemon",
        foreignField: "_id",
        as: "pokemon2_array"
    }
},
{
    $project: {
        pokemon1: {
            $arrayElemAt: ["$pokemon1_array", 0]
        },
        pokemon2: {
            $arrayElemAt: ["$pokemon2_array", 0]
        }
    }
},
{
    $project: {
        winner: {
            $cond: {
                if: { $eq: ["$Winner", "$pokemo1._id"]},
                then: "$pokemon1.name",
                else: "$pokemon2.name"
            }
        }
    }
}
]).pretty();