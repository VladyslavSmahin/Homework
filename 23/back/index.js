const { v4: uuidv4 } = require('uuid');
const express = require(`express`);
const cors = require(`cors`);
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(`public`))
let todos_db = [{
    id: uuidv4(),
    text: `text example`,
    checked: false,
}]
app.listen(3333, () => {
    console.log(`Server is here...`)
})
app.get(`/todos`, (req,res) => {
    res.send(todos_db)
})
app.get(`/todos/:id`, (req,res) => {
    console.log(req.params.id)
    todos_db = todos_db.find(item => item.id === req.params.id)
    res.send(todos_db)
})
app.post(`/todos`, (req,res) => {
    todos_db.push({
        id: uuidv4(),
        ...req.body
    })
    res.send({'message': 'ok'})
})
app.post(`/todos/:id`, (req,res) => {
    const { text } = req.body;
    const id = req.params.id;
    todos_db = todos_db.map(item => {
        if( item.id === id){
            return{
                id,
                text,
                checked: Boolean(this.checked) || item.checked
            }
        } else {
            return item
        }

    })
    res.send(todos_db)
})
app.delete(`/todos/:id`, (req, res) => {
    const id = req.params.id;
    todos_db = todos_db.filter(item => item.id !== id);
    res.send({'message': 'deleted'})
})