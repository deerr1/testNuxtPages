import jwt from "jsonwebtoken"

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    let users: Array<any> | null = await useStorage('files').getItem('fake_db:users.json')
    const indexUser = users?.findIndex((element) => element['username'] == body.login)
    if (!!indexUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Неправильный логин или пароль'
        })
    }
    const currentUser = users[indexUser]
    if (currentUser['password'] !== body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Неправильный логин или пароль'
        })
    }

    
    const SECRET = 'SECRET'
    const refreshSECRET = 'SECRET'
    const accessToken = jwt.sign({userId: currentUser['id']}, SECRET, {expiresIn: '10m', algorithm: 'HS256'})
    const refreshToken = jwt.sign({userId: currentUser['id']}, refreshSECRET, {expiresIn: '4h', algorithm: 'HS256'})

    currentUser['refreshToken'] = refreshToken
    users[indexUser] = currentUser
    await useStorage('files').setItem('fake_db:users.json', users)
    setCookie(event, 'accessToken', accessToken, {httpOnly: true})
    setCookie(event, 'refreshToken', refreshToken, {httpOnly: true})
    return {
        accessToken,
        refreshToken
    }
})