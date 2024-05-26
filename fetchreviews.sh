reviews=$(curl https://letterboxd.com/deadvey/rss/)
echo $reviews | sed -e 's/item\(.*\)item/\1/'
