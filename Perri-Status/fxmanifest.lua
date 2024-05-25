fx_version "cerulean"
author "perrituber"
description "https://discord.gg/HCaZt8PzbM"
game "gta5"

lua54 'yes'

client_scripts {
    'client/*.lua',
}
shared_scripts {
    '@es_extended/imports.lua'
}

ui_page ("ui/ui.html")

files {'**/**/**/**/**/**/*.*'}