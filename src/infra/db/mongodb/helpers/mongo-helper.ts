import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  Client: null as MongoClient,
  url: null as string,

  async connect (url: string) {
    this.url = url
    this.Client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect () {
    await this.Client.close()
    this.Client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.Client?.isConnected()) {
      await this.connect(this.url)
    }
    return this.Client.db().collection(name)
  },

  mapper: (collection: any): any => {
    const { _id, ...collectionData } = collection
    return Object.assign({}, collectionData, { id: _id })
  }
}
