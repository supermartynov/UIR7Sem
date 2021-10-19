const genericCrud = (model) => {
    return {
        async get({ params: {id}}, res) {
            try {
                const item = await model.findByPk(id);
                return res.status(200).send(item);
            } catch (err) {
                return res.status(400).send(err);
            }
        },

        async getAll(req, res) {
            try {
                const items = await model.findAll()
                return res.status(200).send(items)
            } catch (err) {
                return res.status(400).send(err)
            }
        },

        async create({ body }, res) {
            try {
                const item = await model.create(body)
                return req.status(200).send(item)
            } catch (err) {
                return res.status(400).send(err)
            }
        },

        async delete({params: {id}}, req) {
            try {
                const item = await model.destroy({
                    where: {
                        id: id
                    }
                })
                return res.status(200).send(item)
            } catch (err) {
                return res.status(400).send(err)
            }
        }
    }
}

export {genericCrud}