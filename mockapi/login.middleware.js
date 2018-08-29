module.exports = (req, res, next) => {
    const failedResponse = {
        success: false,
        data: {
            message: 'Las credenciales no son validas'
        }
    }
    const successResponse = {
        success: true,
        data: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        }
    }
    if (req.method == 'POST' && req.path == '/login') {
        if (req.body.user === 'liftit' && req.body.pass === 'test') {
            res.status(200).json(successResponse)
        } else {
            res.status(200).json(failedResponse)
        }
    } else {
        next()
    }
}
