import process from 'socket:process'
import os from 'socket:os'

import { fireproof } from '@fireproof/core'

if (process.env.DEBUG) {
  console.log('started in debug mode')
}



window.addEventListener('DOMContentLoaded', () => {
  const platform = os.platform()

  const db = fireproof("socket-test")
  const log = document.querySelector('#app ul')
  db.subscribe((changes) => {
    changes.forEach(change => {
      const li = document.createElement('li')
      li.textContent = JSON.stringify(change, null, 2)
      log.appendChild(li)
    })
  }, true)

  const btn = document.querySelector('button')
  btn.addEventListener('click', () => {
    db.put({ platform, clicked: true, created: Date.now() })
  })

  setTimeout(async () => {
    const h1 = document.querySelector('h1')
    h1.textContent = `Hello, ${platform}!`
    const result = await db.allDocs()
    console.log('result', result)
    db.put({ platform, created: Date.now(), size : result.rows.length })
  }, 201)
})
