import { Request, Response, Router } from 'express'

const router = Router()

router.delete('', async (req: Request, res: Response) => {
  try {
    res.status(204).json('')
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
})

export default router
