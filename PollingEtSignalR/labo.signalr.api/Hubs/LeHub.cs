using labo.signalr.api.Data;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;

namespace labo.signalr.api.Hubs
{
    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }
    public class LeHub : Hub
    {
        ApplicationDbContext _context;

        public LeHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            base.OnConnectedAsync();
            await Clients.All.SendAsync("UserCount", UserHandler.ConnectedIds.Count);
            await Clients.Caller.SendAsync("TaskList", _context.UselessTasks.ToList());
        }
    }
}
