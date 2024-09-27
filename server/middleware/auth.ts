import {URLPattern} from "urlpattern-polyfill";
import jwt from "jsonwebtoken"

export default defineEventHandler((event)=> {
    const privateEnpoints = [
        '/goods/:companyId'
    ]

    const isAuthRequired = privateEnpoints.some(enpoint => {
        const pattern = new URLPattern({pathname: enpoint})

        return pattern.test({pathname: event.node.req.url})
    })

    if (!isAuthRequired) return

    try{
        const SECRET = 'SECRET'
        const accessToken = getCookie(event, 'accessToken')
        jwt.verify(accessToken, SECRET)
    }
    catch(err){
        throw createError({
            statusCode: 401,
            statusMessage: 'Нет доступа'
        })
    }
    
})