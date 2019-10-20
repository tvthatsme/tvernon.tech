---
path: '/blog/move-dynamodb-data-between-regions'
date: '2019-10-20'
title: 'Copy AWS DynamoDB data between regions'
description: "Need to change regions or move your data to a different AWS DynamoDB table? It's not as simple as it might sound. This article is an explanation of a Node.js script that can move data between tables and even AWS regions."
---

I messed up. I was developing a website that would take user data submitted through a form and save it to a database in AWS DynamoDB. However, I chose my default region as us-east-1 (Northern Virginia) instead of somewhere in the European Union (maybe Ireland) like I should have for GDPR reasons. It wasn't until I had some submissions and user data that I realized my mistake and quickly looked for a way to move that data to a different AWS region.

Searching for a way to copy a AWS DynamoDB table from one region to another is more complex that I had anticipated. Google searches and StackOverflow boards weren't giving me anything that worked despite trying some advanced AWS services for data pipelines or migrations. In the end, I realized that the simplest approach for my situation was to write a script that would read everything from the original table and write it to a new table in the correct AWS region. This article is documentation of the NodeJS script I wrote to move DynamoDB data between regions.

## Considerations

**Credentials**

I have my AWS credentials stored in a file on my computer. When the AWS SDK for JavaScript loads, it automatically searches the shared credentials file and (if found) uses the keys found there. If you want to load your keys dynamically, you will need to adjust the following script a bit to set the proper credentials from another place. You can read the documentation for loading the credentials from a shared file [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html).

**Async/Await**

If you look through any AWS documentation for the JavaScript SDK, you will see that the methods provided by the SDK use callbacks as a way of getting data back after the function has run. This works but I wanted to make things asynchronous in order to make things a little more clear. There are some nice resources on [how to promisify](https://javascript.info/promisify) callback methods but maybe I will expand this article in the future and explain the process of how I did it.

**Hard-coding the table names**

This script could be adjusted a bit more to make a slick CLI tool for moving data around. Something that would prompt for the region and table name of the old DynamoDB table and then ask for the desired new region and table name. Because I don't intend to use this script often (learned my lesson hopefully 😅), I left this functionality out-of-scope and hard-coded the region and table names. Minimum viable product.

## The script

There are three functions defined and then one [immediately invoked asynchronous function expression](https://exploringjs.com/impatient-js/ch_async-functions.html#immediately-invoked-async-arrow-functions) that wraps everything together to achieve the desired solution.

```js
const AWS = require('aws-sdk')

// Use the scan method to get everything from the old table
const readAllDataFromTable = async ({ region, table }) => {
  AWS.config.update({ region })
  const db = new AWS.DynamoDB.DocumentClient()

  return await new Promise((resolve, reject) => {
    db.scan(
      {
        TableName: table,
      },
      (err, data) => {
        if (err) {
          reject('Unable to scan the table.')
        } else {
          resolve(data.Items)
        }
      }
    )
  })
}

// Write one row of data to the new table
const writeRowToTable = async (db, table, row) => {
  return await new Promise((resolve, reject) => {
    db.put(
      {
        TableName: table,
        Item: row,
      },
      err => {
        if (err) {
          reject()
        } else {
          resolve()
        }
      }
    )
  })
}

// Write all the data to the new table
const writeDataToTable = async ({ region, table, data }) => {
  AWS.config.update({ region })
  const db = new AWS.DynamoDB.DocumentClient()

  // Keep a count of the successful writes so we can know if
  // all the items were written successfully
  let successfulWrites = 0

  await Promise.all(
    data.map(async item => {
      return new Promise(async resolve => {
        try {
          await writeRowToTable(db, table, item)
          successfulWrites++
        } catch (e) {
          // If something fails, log it
          console.log('error', e)
        }
        resolve()
      })
    })
  )

  console.log(`wrote ${successfulWrites} of ${data.length} rows to database`)
}

// Run the script
;(async function() {
  // Store all the data in memory to write later
  const data = await readAllDataFromTable({
    region: 'us-east-1',
    table: 'OLD-TABLE-NAME',
  })

  // Write the saved data to the new table
  await writeDataToTable({
    region: 'eu-west-1',
    table: 'NEW-TABLE-NAME',
    data,
  })
})()
```

That's it! While I do hope that you don't make the same AWS region mistake as I did, if you find yourself with a similar task, I do think this script will be helpful for you.

## Caveats

This script works great for smaller DynamoDB tables (tested with several hundred lines of entries). I don't know how performant this is for larger tables so your mileage might vary. I'd love to hear from you if you use this for something large or if you have ideas of better approaches for migrating large data sets.

Thanks for reading!
