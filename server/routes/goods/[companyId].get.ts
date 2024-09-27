export default defineEventHandler(async (event) => {
    const companyId = getRouterParam(event, 'companyId')
    const goods = await useStorage('files').getItem('fake_db:goods.json')
    const result = goods.filter((element) => element['companyId'] == companyId)
    return  result
})