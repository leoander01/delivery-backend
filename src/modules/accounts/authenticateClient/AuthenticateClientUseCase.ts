import { prisma } from '../../../database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute ({ username, password }: IAuthenticateClient) {
    // Verificar se username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error('Username or pasword invalid!')
    }
    //Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid')
    }
    // Gerar o token
    const token = sign({ username }, 'test', {
      subject: client.id,
      expiresIn: '1d',
    })

    return token
  }
}