module.exports = class RestfulAPI {
    constructor(resource, model, app) {
        this.resource = resource;
        this.model = model;
        this.app = app;
    }
    findAll(identifier, associates, ...middleware) {
        this.app.get(`/api/${this.resource}/${identifier ? `:${identifier}` : ''}`,
            ...middleware, (req, res) => {
                this.model.findAll({
                    where: identifier ?
                        { [identifier]: req.params[identifier] } : undefined,
                    include: associates || undefined
                })
                    .then(data => res.json(data))
                    .catch(err => {
                        console.log(err);
                        res.json({ error: err });
                    });
            })
    }
    findOne(identifier, associates, ...middleware) {
        this.app.get(`/api/${this.resource}/:${identifier}`, ...middleware, (req, res) => {
            this.model.findOne({
                where: { [identifier]: req.params[identifier] },
                include: associates || undefined
            })
                .then(data => res.json(data))
                .catch(err => res.json({ error: err }));
        })
    }
    create(...middleware) {
        this.app.post(`/api/${this.resource}`, ...middleware, (req, res) => {
            this.model.create(req.body)
                .then(data => res.json(data))
                .catch(err => res.json({ error: err }));
        });
    }
    update(identifier, ...middleware) {
        this.app.put(`/api/${this.resource}/:${identifier}`, ...middleware, (req, res) => {
            this.model.update(req.body, { where: { [identifier]: req.params[identifier] } })
                .then(data => res.json(data))
                .catch(err => res.json({ error: err }));
        })
    }
    delete(identifier, ...middleware) {
        this.app.delete(`/api/${this.resource}/:${identifier}`, ...middleware, (req, res) => {
            this.model.destroy({ where: { [identifier]: req.params[identifier] } })
                .then(data => res.json(data))
                .catch(err => res.json({ error: err }));
        })
    }
}