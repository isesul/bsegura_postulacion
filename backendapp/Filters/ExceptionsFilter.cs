using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BackEndApp.Filters
{
    public class ExceptionsFilter: IExceptionFilter
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IModelMetadataProvider _metadataProvider;
        public ExceptionsFilter(
            IWebHostEnvironment webHostEnvironment,
            IModelMetadataProvider modelMetadataProvider)
        {
            this._webHostEnvironment = webHostEnvironment;
            this._metadataProvider = modelMetadataProvider;
        }
        public void OnException(ExceptionContext context)
        {
            context.Result = new JsonResult("Application Error: " + context.Exception.Message);
        }
    }
}
