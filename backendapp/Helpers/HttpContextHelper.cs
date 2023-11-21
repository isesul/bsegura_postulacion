using Microsoft.EntityFrameworkCore;

namespace BackEndApp.Helpers
{
    public static class HttpContextHelper
    {
        public static async Task ParamPaginationResponse<T>(
            this HttpContext context, 
            IQueryable<T> queryable,
            int pageSize
        )
        {
            if (context == null)
            {
                throw new ArgumentNullException( nameof(context));
            }

            double counter = await queryable.CountAsync();
            double total = Math.Ceiling( counter / pageSize);
            context.Response.Headers.Append("TotalPages", total.ToString());
        }
    }
}
