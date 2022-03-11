SELECT
client.first_name
client.last_name
client.email
client.phone_number
client.home_address
FROM
client
WHERE
client.class_id = ?
ORDER BY
client.last_name