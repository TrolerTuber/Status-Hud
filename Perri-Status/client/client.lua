local ped = PlayerPedId()

local function GetRealPedHealth(ped)
    return math.floor(GetEntityHealth(ped) - 100) < 0 and 0 or math.floor(GetEntityHealth(ped) - 100)
end

CreateThread(function()
    while true do
        local msec = 1000;

        local hunger, thirst 
        TriggerEvent('esx_status:getStatus', 'hunger', function(status) 
            hunger = status.val / 10000 
        end)
        TriggerEvent('esx_status:getStatus', 'thirst', function(status) 
            thirst = status.val / 10000 
        end)

        SendNUIMessage({
            action = "act",
            health = GetRealPedHealth(PlayerPedId()),
            stamina = (100 - GetPlayerSprintStaminaRemaining(PlayerId())),
            armour = GetPedArmour(ped), 
            hunger = hunger or 0, 
            anchor = GetMinimapAnchor(),
            minimap = IsRadarEnabled(),
            oxygen = (math.ceil(GetPlayerUnderwaterTimeRemaining(PlayerId())) * 10),
            thirst = thirst or 0, 
        })
        Wait(msec)
    end
end)



function GetMinimapAnchor()
    -- Safezone goes from 1.0 (no gap) to 0.9 (5% gap (1/20))
    -- 0.05 * ((safezone - 0.9) * 10)
    local safezone = GetSafeZoneSize()
    local safezone_x = 1.0 / 20.0
    local safezone_y = 1.0 / 20.0
    local aspect_ratio = GetAspectRatio(0)
    local res_x, res_y = GetActiveScreenResolution()
    local xscale = 1.0 / res_x
    local yscale = 1.0 / res_y
    local Minimap = {}
    Minimap.width = xscale * (res_x / (4 * aspect_ratio))
    Minimap.height = yscale * (res_y / 5.674)
    Minimap.left_x = xscale * (res_x * (safezone_x * ((math.abs(safezone - 1.0)) * 10)))
    Minimap.bottom_y = 1.0 - yscale * (res_y * (safezone_y * ((math.abs(safezone - 1.0)) * 10)))
    Minimap.right_x = Minimap.left_x + Minimap.width
    Minimap.top_y = Minimap.bottom_y - Minimap.height
    Minimap.x = Minimap.left_x
    Minimap.y = Minimap.top_y
    Minimap.xunit = xscale
    Minimap.yunit = yscale
    return Minimap
end

