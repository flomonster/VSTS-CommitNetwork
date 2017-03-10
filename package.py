import os

# Update version
os.system("jq '.version' < vss-extension.json > tmp")

f = open("tmp", 'r')
v = f.read().splitlines()[0].replace('"', '')
v = v.split('.')
f.close()

v[-1] = str(int(v[-1]) + 1)
new_version = ""
for i in range(len(v)):
    new_version += v[i]
    if i < len(v) - 1:
        new_version += '.'

os.system("jq '.version = \"" + new_version + "\"' < vss-extension.json > tmp")
os.system("cat tmp > vss-extension.json")

# Clear
os.remove("tmp")
os.system("rm -r *~")

# Package
os.system("tfx extension create --manifest-globs vss-extension.json")
