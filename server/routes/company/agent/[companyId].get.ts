export default defineEventHandler(async (event) => {
    const companyId = getRouterParam(event, 'companyId')
    const agents = await useStorage('files').getItem('fake_db:agents.json')
    const result = agents.filter((element) => element['companyId'] == companyId)
    return  result
})