const Bank = require('./model')

module.exports={
    index: async(req, res)=>{
        try{
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus}
            const bank = await Bank.find()

            res.render('admin/bank/view_bank', {
                bank,
                alert
            })
        } catch(err){
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    viewCreate : async(req, res)=>{
        try {
            res.render('admin/bank/create')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    actionCreate : async(req, res)=>{
        try {
            const { accountName, bankName, accountNumber } = req.body

            let bank = await Bank({ accountName, bankName, accountNumber })
            await bank.save();

            req.flash('alertMessage', "Created Successfully!")
            req.flash('alertStatus', 'success')

            res.redirect('/bank')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    viewEdit : async(req, res)=>{
        try {
            const {id} = req.params

            const bank = await Bank.findOne({_id: id})

            console.log(bank)

            res.render('admin/bank/edit', {
                bank
            })
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            
        }
    },

    actionEdit : async (req, res)=>{
        try {
            const {id} = req.params

            const{accountName, bankName, accountNumber} = req.body

            const bank = await Bank.findOneAndUpdate({
                _id:id
            }, {accountName, bankName, accountNumber})

            req.flash('alertMessage', "Edited Successfully!")
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            
        }
    },

    actionDelete : async(req, res)=>{
        try {
            const {id} = req.params

            const bank = await Bank.findOneAndRemove({
                _id:id
            })

            req.flash('alertMessage', "Deleted Successfully!")
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            
        }
    }
}