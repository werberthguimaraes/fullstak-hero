const connection =  require('../db/connection');

module.exports = {
    async index (req, res){
        const {page = 1} = req.query;

        const [count] = await connection('incidents').count();

        
        const incidents =  await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*',
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city',
                'ongs.uf'
            ]);

        res.header('X-Total-Count', count.count);
        
        return res.json(incidents); 
    },
    async create(req, res) {
    
        const {title,description,value} = req.body;

        const ong_id = req.headers.authorization;
       
        const result = await connection('incidents').returning('id').insert({
            title,
            description,
            value,
            ong_id,
        });

        const id = result[0];

        return res.json({"id" : id});
    },

    async delete(req, res){
        const {id}  = req.params;
        const ong_id = req.headers.authorization;
        
        const incicent  = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incicent === undefined)
            res.status(401).json({error : ' operção nao permitida'})

        if (incicent.ong_id != ong_id)  {
            return res.status(401).json({error : ' operção nao permitida'})
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }

}