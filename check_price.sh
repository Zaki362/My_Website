set -e
check() {
  local id="$1"
  local url="https://detail.tmall.com/item.htm?id=${id}"
  echo "=== ITEM ${id} ==="
  taobao-native navigate_to_url --args '{"url":"'"$url"'","sourceApp":"Codex"}' >/tmp/tb_nav.json
  sleep 3
  taobao-native scan_page_elements --args '{"filter":"￥","sourceApp":"Codex"}' -o "/Users/guohuaz/My_Website/scan-${id}.json" >/tmp/tb_scan_out.json
  taobao-native read_page_content --args '{"sourceApp":"Codex"}' -o "/Users/guohuaz/My_Website/read-${id}.json" >/tmp/tb_read_out.json
  echo "SCAN=$(python3 - <<PY
import json,re
obj=json.load(open('/Users/guohuaz/My_Website/scan-${id}.json'))
texts=[]
for el in obj.get('result',{}).get('elements',[]):
    t=el.get('text') or ''
    if '￥' in t:
        texts.append(t.strip())
print(' | '.join(texts[:20]))
PY
)"
  echo "READ=$(python3 - <<PY
import json,re
obj=json.load(open('/Users/guohuaz/My_Website/read-${id}.json'))
text=obj.get('result',{}).get('content','')
# print first few price-like hits
hits=re.findall(r'￥\s*\n?\s*([0-9]+(?:\.[0-9]+)?)', text)
print('hits=' + ','.join(hits[:10]))
print(text[:600].replace('\n',' | '))
PY
)"
}
check 974725466459
check 974287127289
