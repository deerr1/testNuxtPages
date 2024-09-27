import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refreshToken')
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
        currentUser.refreshToken = ''
        users[indexUser] = currentUser
        await useStorage('files').setItem('fake_db:users.json', users)
    }
    catch(err) {
        console.log(err)
        throw createError({
            statusCode: 400,
            statusMessage: 'Ошибка в валидации токена'
        })
    }

    deleteCookie(event, 'accessToken')
    deleteCookie(event, 'refreshToken')

    return {
        
    }
})