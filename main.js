import Crawler from "crawler"
import config from "./config"
import printJson from "./lib/print-json"

const NOW = new Date()
const LAST_MONTH = `${NOW.getFullYear()}-${make2LengthNumber(
  NOW.getMonth() + 0
)}-01`
const THIS_MONTH = `${NOW.getFullYear()}-${make2LengthNumber(
  NOW.getMonth() + 1
)}-01`

export default async function main({ watchId, nameKo }) {
  const url = encodeURI(
    `http://watch.peoplepower21.org/index.php?mid=Euian&member_seq=${watchId}&lname=${nameKo}&show=0&rec_num=50&from=m`
  )

  let totalCount = 0

  try {
    const crawler = new Crawler({
      ...config.crawler,
      callback: async (error, res, done) => {
        if (error) {
          console.log(error)
        } else {
          const $ = res.$
          const laws = $("#content .panel-body table tbody tr")

          laws.each((i, elem) => {
            const tds = $(elem).find("td")

            let isTarget = false
            let item = {}
            tds.each((subI, subElem) => {
              const text = $(subElem).text()

              if (subI === 0 && text >= LAST_MONTH && text < THIS_MONTH) {
                isTarget = true
                totalCount += 1
                item = {}
                item.date = text
              } else if (isTarget && subI === 1) {
                item.title = text
                item.link =
                  "http://watch.peoplepower21.org" +
                  $(subElem)
                    .children()
                    .prop("href")
              } else if (isTarget && subI === 2) {
                item.person = text
              } else if (isTarget && subI === 3) {
                item.committee = text
              } else if (isTarget && subI === 4) {
                item.status = text
                printJson(item)
                isTarget = false
              }
            })
          })

          console.log(
            `⚙️  ${LAST_MONTH.slice(
              0,
              -3
            )}월 동안 총 ${totalCount}개 법안을 발의하였습니다. 🛠`
          )
          done()
        }
      }
    })

    // Queue just one URL, with default callback
    crawler.queue(url)
  } catch (err) {
    console.error(err)
  }
}

function make2LengthNumber(num) {
  if (!num || typeof num !== "number") throw new Error("숫자가 아닙니다.")
  if (num < 10) return `0${num}`
  else return num
}
