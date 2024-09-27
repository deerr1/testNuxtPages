import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {

    let refreshToken = getCookie(event, 'refreshToken')
    if (!refreshToken) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Ошибка в валидации токена'
        })
    }

    try {
        const refreshSECRET = 'SECRET'
        const jwtData = jwt.verify(refreshToken, refreshSECRET)
        let users: Array<any> | null = await useStorage('files').getItem('fake_db:users.json')
        const indexUser = users?.findIndex((element) => element['id'] == jwtData.userId)
        const currentUser = users[indexUser]
        
        if (currentUser.refreshToken !== refreshToken) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Ошибка в валидации токена'
            })
        }

        const SECRET = 'SECRET'
        const accessToken = jwt.sign({userId: currentUser['id']}, SECRET, {expiresIn: '10m', algorithm: 'HS256'})
        refreshToken = jwt.sign({userId: currentUser['id']}, refreshSECRET, {expiresIn: '4h', algorithm: 'HS256'})

        currentUser.refreshToken = refreshToken
        users[indexUser] = currentUser
        await useStorage('files').setItem('fake_db:users.json', users)

        setCookie(event, 'accessToken', accessToken, {httpOnly: true})
        setCookie(event, 'refreshToken', refreshToken, {httpOnly: true})

        return {
        accessToken,
        refreshToken
        }
    }
    catch(err) {
        console.log(err)
        throw createError({
            statusCode: 400,
            statusMessage: 'Ошибка в валидации токена'
        })
    }
})